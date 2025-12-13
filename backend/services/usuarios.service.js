const bcrypt = require("bcryptjs");
const { Usuario } = require("../models");
const ServiceError = require("../utils/serviceError");
const { Op } = require("sequelize");

// Sanitizador
const clean = (str = "") => String(str).trim().toLowerCase();

async function crearUsuario(data, usuarioId = null) {
  let { email, password, rol } = data;

  // 1. Validaciones básicas
  if (!email || !password) {
    throw new ServiceError("email y password son requeridos", 400);
  }

  email = clean(email);
  rol = rol ? clean(rol) : "cliente";

  const rolesPermitidos = ["admin", "cobrador", "cliente"];
  if (!rolesPermitidos.includes(rol)) {
    throw new ServiceError(
      "rol inválido (admin, cobrador o cliente)",
      400
    );
  }

  // 2. Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ServiceError("email no válido", 400);
  }

  // 3. Verificar duplicados
  const existe = await Usuario.findOne({
    where: { email, is_deleted: false },
  });

  if (existe) {
    throw new ServiceError("Ya existe un usuario con ese email", 409);
  }

  // 4. Hash password
  const password_hash = await bcrypt.hash(password, 10);

  // 5. Crear usuario
  const usuario = await Usuario.create({
    email,
    password_hash,
    rol,
    estado: true,
    created_by: usuarioId,
    created_at: new Date(),
    is_deleted: false,
  });

  return usuario;
}

async function listarUsuarios() {
  return Usuario.findAll({
    where: { is_deleted: false },
    attributes: { exclude: ["password_hash"] },
    order: [["created_at", "DESC"]],
  });
}

async function obtenerUsuarioPorId(usuarioId) {
  const usuario = await Usuario.findOne({
    where: { id: usuarioId, is_deleted: false },
    attributes: { exclude: ["password_hash"] },
  });

  if (!usuario) {
    throw new ServiceError("Usuario no encontrado", 404);
  }

  return usuario;
}

async function editarUsuario(usuarioId, data, updatedBy = null) {
  const usuario = await Usuario.findByPk(usuarioId);

  if (!usuario || usuario.is_deleted) {
    throw new ServiceError("Usuario no encontrado", 404);
  }

  // Email
  if (data.email) {
    const email = clean(data.email);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new ServiceError("email no válido", 400);
    }

    const existe = await Usuario.findOne({
      where: {
        email,
        is_deleted: false,
        id: { [Op.ne]: usuarioId },
      },
    });

    if (existe) {
      throw new ServiceError("Ya existe un usuario con ese email", 409);
    }

    usuario.email = email;
  }

  // Rol
  if (data.rol) {
    const rol = clean(data.rol);
    const rolesPermitidos = ["admin", "cobrador", "cliente"];

    if (!rolesPermitidos.includes(rol)) {
      throw new ServiceError("rol inválido", 400);
    }

    usuario.rol = rol;
  }

  // Password
  if (data.password) {
    usuario.password_hash = await bcrypt.hash(data.password, 10);
  }

  // Auditoría
  usuario.updated_at = new Date();
  usuario.updated_by = updatedBy;

  await usuario.save();

  return usuario;
}

async function eliminarUsuario(usuarioId, usuarioIdElimina = null) {
  const usuario = await Usuario.findByPk(usuarioId);

  if (!usuario) {
    throw new ServiceError("Usuario no encontrado", 404);
  }

  if (usuario.is_deleted) {
    throw new ServiceError("El usuario ya se encuentra eliminado", 409);
  }

  usuario.is_deleted = true;
  usuario.estado = false;
  usuario.deleted_at = new Date();
  usuario.updated_by = usuarioIdElimina;

  await usuario.save();

  return usuario;
}

module.exports = {
  crearUsuario,
  listarUsuarios,
  obtenerUsuarioPorId,
  editarUsuario,
  eliminarUsuario,
};
