const bcrypt = require("bcryptjs");
const { Usuario } = require("../models");

// Sanitizador
const clean = (str = "") => String(str).trim().toLowerCase();

exports.listarUsuarios = async (req, res) => {
  console.log("➡️ Entró a listarUsuarios");

  try {
    const usuarios = await Usuario.findAll({
      where: { is_deleted: false },
    });

    console.log("✅ Usuarios obtenidos:", usuarios.length);
    res.status(200).json(usuarios);
  } catch (error) {
    console.error("🔥 ERROR en listarUsuarios:", error);
    res.status(500).json({ error: error.message });
  }
};


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

// obtener usuario por ID
exports.obtenerUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar usuario no eliminado
    const usuario = await Usuario.findOne({
      where: { id, is_deleted: false },
    });

    if (!usuario) {
      return res.status(404).json({
        error: "Usuario no encontrado",
      });
    }

    // Respuesta limpia sin password
    return res.status(200).json({
      mensaje: "Usuario encontrado",
      usuario: {
        id: usuario.id,
        email: usuario.email,
        rol: usuario.rol,
        estado: usuario.estado,
        created_at: usuario.created_at,
        updated_at: usuario.updated_at,
      },
    });
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    return res.status(500).json({
      error: "Error interno del servidor",
    });
  }
};

// controlador de editar usuarios
exports.editarUsuario = async (req, res) => {
  try {
    const { id } = req.params; // viene por URL: /usuarios/:id
    let { email, password, rol, updated_by } = req.body;

    // 1. Validar ID
    const usuario = await Usuario.findOne({
      where: { id, is_deleted: false },
    });

    if (!usuario) {
      return res.status(404).json({
        error: "Usuario no encontrado",
      });
    }

    // 2. Sanitizar email si viene
    if (email) {
      email = clean(email);

      // Validar estructura
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          error: "email no válido",
        });
      }

      // corrección: operador correcto en Sequelize
      const existeOtro = await Usuario.findOne({
        where: {
          email,
          is_deleted: false,
          id: { [require("sequelize").Op.ne]: id },
        },
      });

      if (existeOtro) {
        return res.status(409).json({
          error: "Ya existe un usuario con ese email",
        });
      }
    }

    // 3. Validar rol si viene
    if (rol) {
      rol = clean(rol);
      const rolesPermitidos = ["admin", "cobrador", "cliente"];

      if (!rolesPermitidos.includes(rol)) {
        return res.status(400).json({
          error: "rol inválido (debe ser admin, cobrador o cliente)",
        });
      }
    }

    // 4. Si viene password, hashearla
    let password_hash = usuario.password_hash;
    if (password) {
      password_hash = await bcrypt.hash(password, 10);
    }

    // 5. Actualizar usuario
    await usuario.update({
      email: email ?? usuario.email,
      password_hash,
      rol: rol ?? usuario.rol,
      updated_by: updated_by || null,
      updated_at: new Date(),
    });

    // 6. Respuesta sin password
    const usuarioResp = {
      id: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
      estado: usuario.estado,
      updated_at: usuario.updated_at,
    };

    return res.status(200).json({
      mensaje: "Usuario actualizado exitosamente",
      usuario: usuarioResp,
    });
  } catch (error) {
    console.error("Error al editar usuario:", error);
    return res.status(500).json({
      error: "Error interno del servidor",
    });
  }
};

//controlador para eliminar usuario

exports.eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { updated_by } = req.body || {};

    const usuario = await Usuario.findOne({
      where: { id, is_deleted: false },
    });

    if (!usuario) {
      return res.status(404).json({
        error: "Usuario no encontrado",
      });
    }

    const fechaActual = new Date();

    await usuario.update({
      is_deleted: true,
      deleted_at: fechaActual,
      updated_by: updated_by || null,
      updated_at: fechaActual,
      estado: false,
    });

    return res.status(200).json({
      mensaje: "Usuario eliminado correctamente",
      usuario: {
        id: usuario.id,
        email: usuario.email,
        rol: usuario.rol,
        estado: false,
        deleted_at: fechaActual,
      },
    });
  } catch (error) {
    console.error("Error al eliminar el usuario", error);
    return res.status(500).json({
      error: "Error interno del servidor",
    });
  }
};
