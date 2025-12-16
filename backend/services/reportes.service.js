const {
  Pago,
  Apartamento,
  Cliente,
  Sucursal,
  Contrato,
  Comprobante,
} = require("../models");
const { Op, fn, col, literal } = require("sequelize");
const ServiceError = require("../utils/serviceError");

function transformarMeses(rows) {
  const meses = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];

  return rows.map((row) => ({
    mes: meses[row.mes_num - 1],
    pagos: Number(row.pagos),
    ingresos: Number(row.ingresos),
  }));
}

async function pagosMensuales(sucursalId, fechaInicio, fechaFinal) {
  // 1. Validar sucursal
  const sucursal = await Sucursal.findByPk(sucursalId);
  if (!sucursal) {
    throw new ServiceError("La sucursal no existe", 404);
  }

  // 2. Where base
  const wherePago = {
    is_deleted: false,
    estado_pago: "pagado",
  };

  if (fechaInicio && fechaFinal) {
    wherePago.periodo = {
      [Op.between]: [fechaInicio, fechaFinal],
    };
  }

  // 3. Query agregada
  const rows = await Pago.findAll({
    attributes: [
      // mes numérico (1–12)
      [fn("EXTRACT", literal("MONTH FROM periodo")), "mes_num"],
      // cantidad de pagos
      [fn("COUNT", col("Pago.id")), "pagos"],
      // total ingresos
      [fn("SUM", col("Pago.monto")), "ingresos"],
    ],
    where: wherePago,
    include: [
      {
        model: Contrato,
        as: "contrato",
        required: true,
        attributes: [],
        include: [
          {
            model: Apartamento,
            as: "apartamento",
            required: true,
            attributes: [],
            include: [
              {
                model: Sucursal,
                as: "sucursal",
                required: true,
                where: { id: sucursalId },
                attributes: [],
              },
            ],
          },
        ],
      },
    ],
    group: [literal("mes_num")],
    order: [literal("mes_num ASC")],
    raw: true,
  });

  // 4. Transformar al formato del frontend
  return transformarMeses(rows);
}

async function ocupacion(sucursalId, fechaInicio, fechaFinal) {
  // 1. Validar sucursal
  const sucursal = await Sucursal.findByPk(sucursalId);
  if (!sucursal) {
    throw new ServiceError("La sucursal no existe", 404);
  }

  // 2. Filtro base de contratos
  const whereContrato = {
    is_deleted: false,
  };

  if (fechaInicio && fechaFinal) {
    whereContrato[Op.and] = [
      {
        periodo_inicio: {
          [Op.lte]: fechaFinal,
        },
      },
      {
        periodo_fin: {
          [Op.gte]: fechaInicio,
        },
      },
    ];
  }

  // 3. Apartamentos ocupados
  const ocupados = await Apartamento.count({
    where: {
      is_deleted: false,
      "$contratos.id$": {
        [Op.ne]: null,
      },
    },
    include: [
      {
        model: Sucursal,
        as: "sucursal",
        required: true,
        where: { id: sucursalId },
      },
      {
        model: Contrato,
        as: "contratos",
        required: false,
        where: whereContrato,
      },
    ],
    distinct: true,
  });

  // 4. Apartamentos disponibles
  const disponibles = await Apartamento.count({
    where: {
      is_deleted: false,
      "$contratos.id$": null,
    },
    include: [
      {
        model: Sucursal,
        as: "sucursal",
        required: true,
        where: { id: sucursalId },
      },
      {
        model: Contrato,
        as: "contratos",
        required: false,
        where: whereContrato,
      },
    ],
    distinct: true,
    subQuery: false,
  });

  // 5. Respuesta
  return {
    sucursalId,
    disponibles,
    ocupados,
    total: disponibles + ocupados,
  };
}

async function ocupacionMensual(sucursalId, fechaInicio, fechaFinal) {
  const sucursal = await Sucursal.findByPk(sucursalId);
  if (!sucursal) {
    throw new ServiceError("La sucursal no existe", 404);
  }

  const totalApartamentos = await Apartamento.count({
    where: { is_deleted: false },
    include: [
      {
        model: Sucursal,
        as: "sucursal",
        required: true,
        where: { id: sucursalId },
      },
    ],
    distinct: true,
  });

  const meses = [];
  let cursor = new Date(fechaInicio);

  while (cursor <= fechaFinal) {
    meses.push(new Date(cursor.getFullYear(), cursor.getMonth(), 1));
    cursor.setMonth(cursor.getMonth() + 1);
  }

  const resultados = [];

  for (const mes of meses) {
    const inicioMes = new Date(mes);
    const finMes = new Date(mes.getFullYear(), mes.getMonth() + 1, 0);

    const ocupados = await Apartamento.count({
      where: {
        is_deleted: false,
        "$contratos.id$": { [Op.ne]: null },
      },
      include: [
        {
          model: Sucursal,
          as: "sucursal",
          required: true,
          where: { id: sucursalId },
        },
        {
          model: Contrato,
          as: "contratos",
          required: false,
          where: {
            is_deleted: false,
            [Op.and]: [
              { periodo_inicio: { [Op.lte]: finMes } },
              { periodo_fin: { [Op.gte]: inicioMes } },
            ],
          },
        },
      ],
      distinct: true,
    });

    resultados.push({
      periodo: inicioMes, // YYYY-MM-01
      ocupados,
      total: totalApartamentos,
    });
  }

  return resultados;
}

async function clientesAtrasados(sucursalId) {
  const sucursal = await Sucursal.findByPk(sucursalId);
  if (!sucursal) {
    throw new ServiceError("Sucursal no encontrada", 404);
  }

  const hoy = new Date();

  const clientes = await Cliente.findAll({
    attributes: [
      "id",
      [
        fn(
          "CONCAT",
          col("Cliente.nombre"),
          literal(`' '`),
          col("Cliente.apellido")
        ),
        "cliente",
      ],
      [fn("SUM", col("contratos.pagos.monto")), "monto"],
      [fn("MIN", col("contratos.pagos.periodo")), "fechaLimite"],
      [
        literal(`CURRENT_DATE - MIN("contratos->pagos"."periodo")`),
        "diasAtraso",
      ],
      [fn("MAX", col("contratos.estado")), "estadoContrato"],
    ],
    include: [
      {
        model: Contrato,
        as: "contratos",
        required: true,
        include: [
          {
            model: Pago,
            as: "pagos",
            required: true,
            where: {
              periodo: { [Op.lt]: hoy },
              estado_pago: { [Op.ne]: "pagado" },
              is_deleted: false,
            },
            attributes: [],
          },
          {
            model: Apartamento,
            as: "apartamento",
            required: true,

            include: [
              {
                model: Sucursal,
                as: "sucursal",
                required: true,
                where: { id: sucursalId },
                attributes: [],
              },
            ],
            attributes: [],
          },
        ],
        attributes: [],
      },
    ],
    group: ["Cliente.id"],
  });

  return {
    sucursalId,
    totalAtrasados: clientes.length,
    clientes,
  };
}

async function ocupacionTotal() {
  const ocupados = await Apartamento.count({
    where: {
      is_deleted: false,
      estado_ocupacion: "ocupado",
    },
  });

  const disponibles = await Apartamento.count({
    where: {
      is_deleted: false,
      estado_ocupacion: "disponible",
    },
  });
  return {
    ocupados,
    disponibles,
    total: ocupados + disponibles,
  };
}

async function morosidadTotal() {
  const hoy = new Date();

  const totalMorosos = await Cliente.count({
    distinct: true,

    include: [
      {
        model: Contrato,
        as: "contratos",
        required: true,
        attributes: [],
        include: [
          {
            model: Pago,
            as: "pagos",
            required: true,
            attributes: [],
            where: {
              periodo: { [Op.lt]: hoy },
              estado_pago: { [Op.ne]: "pagado" },
              is_deleted: false,
            },
          },
        ],
      },
    ],
  });

  return { clientesAtrasados: totalMorosos };
}
async function clientesTotal() {
  const totalClientes = await Cliente.count({
    where: { is_deleted: false },
  });

  return { totalClientes: totalClientes };
}

async function contratos() {
  const ultimosContratos = await Contrato.findAll({
    where: {
      is_deleted: false,
    },
    include: [
      {
        model: Cliente,
        as: "cliente",
        attributes: ["id", "nombre", "apellido"],
      },
      {
        model: Apartamento,
        as: "apartamento",
        attributes: ["id", "numero_apartamento"],
      },
    ],

    order: [["created_at", "DESC"]],
    limit: 5,
  });

  return { contratos: ultimosContratos };
}

async function contratosById(usuarioId) {
  const cliente = await Cliente.findOne({
    where: {
      id_usuario: usuarioId,
      is_deleted: false,
    },
  });
  // buscar contrato activo del cliente
  const contratoActual = await Contrato.findOne({
    where: {
      id_cliente: cliente.id,
      is_deleted: false,
      estado: "activo",
    },
    include: [
      {
        model: Apartamento,
        as: "apartamento",
        attributes: ["id", "numero_apartamento"],
      },
    ],
    order: [["created_at", "DESC"]],
  });

  if (!contratoActual) {
    return {
      infoContrato: null,
      siguientePago: null,
    };
  }

  // buscar el siguiente pago pendiente
  const hoy = new Date();

  const siguientePago = await Pago.findOne({
    where: {
      id_contrato: contratoActual.id,
      is_deleted: false,
      estado_pago: { [Op.ne]: "pagado" },
      periodo: { [Op.gte]: hoy },
    },
    order: [["periodo", "ASC"]],
  });

  return {
    infoContrato: contratoActual,
    siguientePago,
  };
}

async function comprobantesById(usuarioId) {
  // 1️⃣ Cliente desde usuario
  const cliente = await Cliente.findOne({
    where: {
      id_usuario: usuarioId,
      is_deleted: false,
    },
  });

  if (!cliente) {
    throw new ServiceError("Cliente no encontrado para este usuario", 404);
  }

  // 2️⃣ Contratos del cliente
  const contratos = await Contrato.findAll({
    where: {
      id_cliente: cliente.id,
      is_deleted: false,
    },
    attributes: ["id"],
    raw: true,
  });

  if (contratos.length === 0) {
    return {
      resumen: {
        total: 0,
        validados: 0,
        pendientes: 0,
        rechazados: 0,
      },
      comprobantes: [],
    };
  }

  const contratoIds = contratos.map((c) => c.id);

  // 3️⃣ Conteo de comprobantes por estado (JOIN lógico vía Pago)
  const resumenRaw = await Comprobante.findAll({
    attributes: [
      [fn("COUNT", col("Comprobante.id")), "total"],
      [
        fn(
          "SUM",
          literal(
            `CASE WHEN "Comprobante"."estado_validacion" = 'validado' THEN 1 ELSE 0 END`
          )
        ),
        "validados",
      ],
      [
        fn(
          "SUM",
          literal(
            `CASE WHEN "Comprobante"."estado_validacion" = 'pendiente' THEN 1 ELSE 0 END`
          )
        ),
        "pendientes",
      ],
      [
        fn(
          "SUM",
          literal(
            `CASE WHEN "Comprobante"."estado_validacion" = 'rechazado' THEN 1 ELSE 0 END`
          )
        ),
        "rechazados",
      ],
    ],
    include: [
      {
        model: Pago,
        as: "pago",
        required: true,
        where: {
          id_contrato: contratoIds,
          is_deleted: false,
        },
        attributes: [],
      },
    ],
    where: {
      is_deleted: false,
    },
    raw: true,
  });

  const resumen = {
    total: Number(resumenRaw[0].total) || 0,
    validados: Number(resumenRaw[0].validados) || 0,
    pendientes: Number(resumenRaw[0].pendientes) || 0,
    rechazados: Number(resumenRaw[0].rechazados) || 0,
  };

  // 4️⃣ Últimos 5 comprobantes con info del pago
  const comprobantes = await Comprobante.findAll({
    where: {
      is_deleted: false,
    },
    attributes: ["id", "estado_validacion", "notas", "created_at"],
    include: [
      {
        model: Pago,
        as: "pago",
        required: true,
        where: {
          id_contrato: contratoIds,
          is_deleted: false,
        },
        attributes: ["monto", "metodo", "fecha"],
      },
    ],
    order: [["created_at", "DESC"]],
    limit: 5,
  });

  // 5️⃣ Normalizar salida para frontend
  const comprobantesFormateados = comprobantes.map((c) => ({
    id: c.id,
    fecha: c.pago.fecha,
    monto: c.pago.monto,
    metodo: c.pago.metodo,
    estado: c.estado_validacion,
    notas: c.notas,
  }));

  return {
    resumen,
    comprobantes: comprobantesFormateados,
  };
}

module.exports = {
  pagosMensuales,
  ocupacion,
  ocupacionMensual,
  clientesAtrasados,
  ocupacionTotal,
  morosidadTotal,
  clientesTotal,
  contratos,
  comprobantesById,
  contratosById,
};
