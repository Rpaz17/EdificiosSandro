const sucursalesService = require("../services/sucursales.service");
const ServiceError = require("../utils/serviceError");
const { Sucursal } = require("../models");




const listarSucursales = async (req, res) => {
  try {
    const sucursales = await Sucursal.findAll({
      where: { is_deleted: false },
      order: [["created_at", "DESC"]],
    });

    return res.status(200).json({
      sucursales,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Error al listar sucursales",
    });
  }
};


const crearSucursal = async (req, res) => {
  try {
    const usuarioId = req.body.created_by || null;

    const sucursal = await sucursalesService.crearSucursal(
      req.body,
      usuarioId
    );

    return res.status(201).json({
      mensaje: "Sucursal registrada exitosamente",
      sucursal,
    });
  } catch (error) {
    return manejarError(res, error);
  }
};


const editarSucursal = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioId = req.body.updated_by || null;

    const sucursal = await sucursalesService.editarSucursal(
      id,
      req.body,
      usuarioId
    );

    return res.status(200).json({
      mensaje: "Sucursal actualizada exitosamente",
      sucursal,
    });
  } catch (error) {
    return manejarError(res, error);
  }
};

const eliminarSucursal = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioId = req.body.updated_by || null;

    await sucursalesService.eliminarSucursal(id, usuarioId);

    return res.status(200).json({
      mensaje: "Sucursal eliminada exitosamente",
    });
  } catch (error) {
    return manejarError(res, error);
  }
};

function manejarError(res, error) {
  if (error instanceof ServiceError) {
    return res.status(error.statusCode).json({
      error: error.message,
    });
  }

  console.error(error);
  return res.status(500).json({
    error: "Error interno del servidor",
  });
}

module.exports = {
  listarSucursales,
  crearSucursal,
  editarSucursal,
  eliminarSucursal,
};
