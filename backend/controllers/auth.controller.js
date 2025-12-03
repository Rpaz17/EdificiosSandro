// controllers/auth.controller.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Usuario } = require("../models");

// misma función clean que usas en usuarios
const clean = (str = "") => String(str).trim().toLowerCase();

async function login(req, res) {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "email y password son requeridos",
      });
    }

    email = clean(email);

    // buscar usuario no eliminado
    const usuario = await Usuario.findOne({
      where: {
        email,
        is_deleted: false,
      },
    });

    if (!usuario) {
      return res.status(404).json({
        error: "Usuario no encontrado",
      });
    }

    // puedes decidir si bloqueas usuarios con estado = false
    if (usuario.estado === false) {
      return res.status(403).json({
        error: "Usuario inactivo",
      });
    }

    // comparar contraseña con el hash guardado
    const passwordValida = await bcrypt.compare(
      password,
      usuario.password_hash
    );

    if (!passwordValida) {
      return res.status(400).json({
        error: "Credenciales inválidas",
      });
    }

    // payload del token
    const payload = {
      id: usuario.id,
      email: usuario.email,
      rol: usuario.rol, // admin, cobrador, cliente
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || "CLAVE_SUPER_SECRETA",
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      mensaje: "Inicio de sesión exitoso",
      token,
      usuario: {
        id: usuario.id,
        email: usuario.email,
        rol: usuario.rol,
        estado: usuario.estado,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({
      error: "Error interno del servidor",
    });
  }
}

module.exports = {
  login,
};
