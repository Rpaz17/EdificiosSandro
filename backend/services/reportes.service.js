const { Pago, Apartamento, Cliente, Sucursal, Contrato } = require("../models");
const { Op } = require("sequelize");
const ServiceError = require("../utils/serviceError");

async function pagosMensuales(sucursalId, fechaInicio, fechaFinal) {
  const sucursal = await Sucursal.findByPk(sucursalId);
  if (!sucursal) {
    throw new ServiceError("La sucursal no existe", 404);
  }

  const pagos = await Pago.findAll({
    where: {
      fecha: {
        [Op.between]: [fechaInicio, fechaFinal],
      },
    },
    include: [
      {
        model: Contrato,
        required: true,
        include: [
          {
            model: Apartamento,
            required: true,
            include: [
              {
                model: Sucursal,
                required: true,
                where: { id: sucursalId },
              },
            ],
          },
        ],
      },
    ],
  });

  if (pagos.length === 0) {
    throw new ServiceError(
      "No hay pagos registrados en este rango de fechas",
      404
    );
  }

  return pagos;
}

async function ocupacion(sucursalId) {
  const sucursal = await Sucursal.findByPk(sucursalId);
  if (!sucursal) {
    throw new ServiceError("La sucursal no existe", 404);
  }
  //Apartamentos Ocupados
  const ocupados = await Apartamento.count({
    where: {
      estado_ocupacion: {
        [Op.ne]: "disponible",
      },
    },
    include: [
      {
        model: Sucursal,
        required: true,
        where: { id: sucursalId },
      },
    ],
  });

  //Apartamentos disponibles
  const disponibles = await Apartamento.count({
    where: {
      estado_ocupacion: "disponible",
    },
    include: [
      {
        model: Sucursal,
        required: true,
        where: { id: sucursalId },
      },
    ],
  });

  //Response
  return {
    sucursalId,
    disponibles,
    ocupados,
    total: disponibles + ocupados,
  };
}

async function clientesAtrasados(sucursalId) {
  const sucursal = await Sucursal.findByPk(sucursalId);
  if (!sucursal) {
    throw new ServiceError("Sucursal no encontrada", 404);
  }

  const hoy = new Date();

  const clientes = await Cliente.findAll({
    distinct: true,
    include: [
      {
        model: Contrato,
        required: true,
        include: [
          {
            model: Pago,
            required: true,
            where: {
              periodo: { [Op.lt]: hoy },
              estado_pago: { [Op.ne]: "pagado" },
            },
          },
          {
            model: Apartamento,
            required: true,
            include: [
              {
                model: Sucursal,
                required: true,
                where: { id: sucursalId },
              },
            ],
          },
        ],
      },
    ],
  });

  return {
    sucursalId,
    totalAtrasados: clientes.length,
    clientes,
  };
}

module.exports = {
  pagosMensuales,
  ocupacion,
  clientesAtrasados,
};
