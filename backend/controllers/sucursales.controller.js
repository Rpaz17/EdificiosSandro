"use strict";
const { Sucursal } = require("../models");

// Sanitizador
const clean = (str = "") => String(str).trim();

/**
 * Crear nueva sucursal
 */
const crearSucursal = async (req, res) => {
  try {
    let { nombre, ciudad, sector, calle, created_by } = req.body;

    // Validación
    if (!nombre) {
      return res.status(400).json({
        error: "El campo 'nombre' es obligatorio.",
      });
    }

    // Sanitizar datos
    nombre = clean(nombre);
    ciudad = ciudad ? clean(ciudad) : null;
    sector = sector ? clean(sector) : null;
    calle = calle ? clean(calle) : null;

    // Crear sucursal
    const nuevaSucursal = await Sucursal.create({
      nombre,
      ciudad,
      sector,
      calle,
      created_at: new Date(),
      created_by: created_by || null,
      is_deleted: false,
    });

    // Respuesta limpia
    const sucursalResp = {
      id: nuevaSucursal.id,
      nombre: nuevaSucursal.nombre,
      ciudad: nuevaSucursal.ciudad,
      sector: nuevaSucursal.sector,
      calle: nuevaSucursal.calle,
      created_at: nuevaSucursal.created_at,
    };

    return res.status(201).json({
      mensaje: "Sucursal registrada exitosamente",
      sucursal: sucursalResp,
    });
  } catch (error) {
    console.error("Error al crear sucursal:", error);
    return res.status(500).json({
      error: "Error interno del servidor",
    });
  }
};

/**
 * Obtener sucursal por ID
 */
const obtenerSucursal = async (req, res) => {
  try {
    const { id } = req.params;

    const sucursal = await Sucursal.findOne({
      where: { id, is_deleted: false },
    });

    if (!sucursal) {
      return res.status(404).json({
        error: "Sucursal no encontrada",
      });
    }

    return res.status(200).json({
      mensaje: "Sucursal encontrada",
      sucursal: {
        id: sucursal.id,
        nombre: sucursal.nombre,
        ciudad: sucursal.ciudad,
        sector: sucursal.sector,
        calle: sucursal.calle,
        created_at: sucursal.created_at,
        updated_at: sucursal.updated_at,
      },
    });
  } catch (error) {
    console.error("Error al obtener sucursal:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

/**
 * Editar sucursal
 */
const editarSucursal = async (req, res) => {
  try {
    const { id } = req.params;
    let { nombre, ciudad, sector, calle, updated_by } = req.body;

    const sucursal = await Sucursal.findOne({
      where: { id, is_deleted: false },
    });

    if (!sucursal) {
      return res.status(404).json({
        error: "Sucursal no encontrada",
      });
    }

    // Sanitizar datos
    nombre = nombre ? clean(nombre) : sucursal.nombre;
    ciudad = ciudad ? clean(ciudad) : sucursal.ciudad;
    sector = sector ? clean(sector) : sucursal.sector;
    calle = calle ? clean(calle) : sucursal.calle;

    await sucursal.update({
      nombre,
      ciudad,
      sector,
      calle,
      updated_by: updated_by || null,
      updated_at: new Date(),
    });

    return res.status(200).json({
      mensaje: "Sucursal actualizada exitosamente",
      sucursal: {
        id: sucursal.id,
        nombre: sucursal.nombre,
        ciudad: sucursal.ciudad,
        sector: sucursal.sector,
        calle: sucursal.calle,
        updated_at: sucursal.updated_at,
      },
    });
  } catch (error) {
    console.error("Error al editar sucursal:", error);
    return res.status(500).json({
      error: "Error interno del servidor",
    });
  }
};

/**
 * Eliminar sucursal (soft delete)
 */
const eliminarSucursal = async (req, res) => {
  try {
    const { id } = req.params;
    const { updated_by } = req.body;

    const sucursal = await Sucursal.findOne({
      where: { id, is_deleted: false },
    });

    if (!sucursal) {
      return res.status(404).json({
        error: "Sucursal no encontrada",
      });
    }

    await sucursal.update({
      is_deleted: true,
      deleted_at: new Date(),
      updated_by: updated_by || null,
    });

    return res.status(200).json({
      mensaje: "Sucursal eliminada exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar sucursal:", error);
    return res.status(500).json({
      error: "Error interno del servidor",
    });
  }
};

module.exports = {
  crearSucursal,
  obtenerSucursal,
  editarSucursal,
  eliminarSucursal,
};
