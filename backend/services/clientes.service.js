const { Cliente } = require("../models/cliente.model");
const ServiceError = require("../utils/serviceError");

async function editarCliente(clienteId, data, usuarioId) {
  // Validar existencia del cliente
  const cliente = await Cliente.findByPk(clienteId);

  if (!cliente) {
    throw new ServiceError("El cliente no existe", 404);
  }

  // Evitar editar clientes eliminados
  if (cliente.is_deleted) {
    throw new ServiceError("El cliente ha sido eliminado", 410);
  }

  // Actualizar campos (solo los que se envían)
  cliente.nombre = data.nombre ?? cliente.nombre;
  cliente.apellido = data.apellido ?? cliente.apellido;
  cliente.identificacion = data.identificacion ?? cliente.identificacion;
  cliente.telefono = data.telefono ?? cliente.telefono;
  cliente.correo = data.correo ?? cliente.correo;

  // Auditoría
  cliente.updated_at = new Date();
  cliente.updated_by = usuarioId;

  await cliente.save();

  return cliente;
}

async function eliminarCliente(clienteId, usuarioId) {
  // 1. Validar si el cliente existe
  const cliente = await Cliente.findByPk(clienteId);

  if (!cliente) {
    throw new ServiceError("El cliente no existe", 404);
  }

  // 2. Evitar eliminar si ya está marcado como eliminado
  if (cliente.is_deleted) {
    throw new ServiceError("El cliente ya se encuentra eliminado", 409);
  }

  // 3. Soft delete
  cliente.is_deleted = true;
  cliente.deleted_at = new Date();
  cliente.updated_by = usuarioId;

  await cliente.save();

  return cliente;
}
module.exports = {
  editarCliente,
  eliminarCliente,
};
