const { Sucursal } = require("../models");
const ServiceError = require("../utils/serviceError");

/**
 * Listar sucursales (solo no eliminadas)
 */
async function listarSucursales() {
  const sucursales = await Sucursal.findAll({
    where: {
      is_deleted: false,
    },
    order: [["nombre", "ASC"]],
  });

  return sucursales;
}

/**
 * Crear sucursal
 */
async function crearSucursal(data, usuarioId) {
  if (!data.nombre) {
    throw new ServiceError("El nombre de la sucursal es obligatorio", 400);
  }

  const nuevaSucursal = await Sucursal.create({
    nombre: data.nombre,
    ciudad: data.ciudad ?? null,
    sector: data.sector ?? null,
    calle: data.calle ?? null,

    created_at: new Date(),
    created_by: usuarioId,
    is_deleted: false,
  });

  return nuevaSucursal;
}

/**
 * Editar sucursal
 */
async function editarSucursal(sucursalId, data, usuarioId) {
  const sucursal = await Sucursal.findByPk(sucursalId);

  if (!sucursal) {
    throw new ServiceError("La sucursal no existe", 404);
  }

  if (sucursal.is_deleted) {
    throw new ServiceError("La sucursal ha sido eliminada", 410);
  }

  // Actualizar solo campos enviados
  sucursal.nombre = data.nombre ?? sucursal.nombre;
  sucursal.ciudad = data.ciudad ?? sucursal.ciudad;
  sucursal.sector = data.sector ?? sucursal.sector;
  sucursal.calle = data.calle ?? sucursal.calle;

  // Auditoría
  sucursal.updated_at = new Date();
  sucursal.updated_by = usuarioId;

  await sucursal.save();

  return sucursal;
}

/**
 * Eliminar sucursal (soft delete)
 */
async function eliminarSucursal(sucursalId, usuarioId) {
  const sucursal = await Sucursal.findByPk(sucursalId);

  if (!sucursal) {
    throw new ServiceError("La sucursal no existe", 404);
  }

  if (sucursal.is_deleted) {
    throw new ServiceError("La sucursal ya se encuentra eliminada", 409);
  }

  sucursal.is_deleted = true;
  sucursal.deleted_at = new Date();
  sucursal.updated_by = usuarioId;

  await sucursal.save();

  return sucursal;
}

module.exports = {
  listarSucursales,
  crearSucursal,
  editarSucursal,
  eliminarSucursal,
};
