const bcrypt = require("bcryptjs");
const { Usuario } = require("../models");

// Sanitizador
const clean = (str = "") => String(str).trim().toLowerCase();

//controlador de crear usuario
exports.crearUsuario = async (req, res) => {
  try {
    let { email, password, rol, created_by } = req.body;

    // 1. Validación de campos requeridos
    if (!email || !password) {
      return res.status(400).json({
        error: "email y password son requeridos",
      });
    }

    // sanitizar
    email = clean(email);
    rol = rol ? clean(rol) : "cliente";

    // validacion de que rol es
    const rolesPermitidos = ["admin", "cobrador", "cliente"];
    if (!rolesPermitidos.includes(rol)) {
      return res.status(400).json({
        error: "rol inválido (debe ser admin, cobrador o cliente)",
      });
    }

    // validar eamil
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "email no válido",
      });
    }

    // verificar duplicados
    const existe = await Usuario.findOne({
      where: { email, is_deleted: false },
    });

    if (existe) {
      return res.status(409).json({
        error: "Ya existe un usuario con ese email",
      });
    }

    // hashear contra
    const password_hash = await bcrypt.hash(password, 10);

    //crear usuario
    const nuevoUsuario = await Usuario.create({
      email,
      password_hash,
      rol,
      estado: true,
      created_by: created_by || null,
      created_at: new Date(),
      is_deleted: false,
    });

    // 7. Respuesta limpia sin password
    const usuarioResp = {
      id: nuevoUsuario.id,
      email: nuevoUsuario.email,
      rol: nuevoUsuario.rol,
      estado: nuevoUsuario.estado,
      created_at: nuevoUsuario.created_at,
    };

    return res.status(201).json({
      mensaje: "Usuario registrado exitosamente",
      usuario: usuarioResp,
    });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    return res.status(500).json({
      error: "Error interno del servidor",
    });
  }
};
