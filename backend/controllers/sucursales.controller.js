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

// Exportar correctamente
module.exports = { crearSucursal };
