const { Pago, Apartamento, Cliente, Sucursal, Contrato } = require("../models");
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
  const hoy = new Date(); // o usa CURRENT_DATE con literal si prefieres

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

  return { ClientesAtrasados: totalMorosos };
}

module.exports = {
  pagosMensuales,
  ocupacion,
  ocupacionMensual,
  clientesAtrasados,
  ocupacionTotal,
  morosidadTotal,
};
