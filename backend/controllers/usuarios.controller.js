const bcrypt = require("bcryptjs");
const { Usuario } = require("../models");

// Sanitizador
const clean = (str = "") => String(str).trim().toLowerCase();

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Gestión de usuarios
 */

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña en texto plano (se hashea automáticamente)
 *               rol:
 *                 type: string
 *                 description: Rol del usuario (admin, cobrador o cliente)
 *               created_by:
 *                 type: integer
 *                 description: ID del usuario que registra al nuevo usuario
 *             required:
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     email:
 *                       type: string
 *                     rol:
 *                       type: string
 *                     estado:
 *                       type: boolean
 *                     created_at:
 *                       type: string
 *
 *       400:
 *         description: Datos inválidos o incompletos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *
 *       409:
 *         description: El email ya está registrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Editar un usuario existente
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a editar
 *         schema:
 *           type: integer
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Nuevo email del usuario
 *               password:
 *                 type: string
 *                 description: Nueva contraseña (se hashea automáticamente)
 *               rol:
 *                 type: string
 *                 description: Nuevo rol del usuario
 *               updated_by:
 *                 type: integer
 *                 description: ID del usuario que realiza la modificación
 *
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     email:
 *                       type: string
 *                     rol:
 *                       type: string
 *                     estado:
 *                       type: boolean
 *                     updated_at:
 *                       type: string
 *
 *       400:
 *         description: Datos inválidos (email mal formado o rol no permitido)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *
 *       409:
 *         description: Ya existe otro usuario con el mismo email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Eliminar un usuario (soft delete)
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a eliminar
 *         schema:
 *           type: integer
 *
 *     requestBody:
 *       required: false
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               updated_by:
 *                 type: integer
 *                 description: ID del usuario que realiza la eliminación
 *
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     email:
 *                       type: string
 *                     rol:
 *                       type: string
 *                     estado:
 *                       type: boolean
 *                     deleted_at:
 *                       type: string
 *
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

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
    const { updated_by } = req.body;

    //verificar que exista el usuario

    const usuario = await Usuario.findOne({
      where: { id, is_deleted: false }, //lo buscamos por id y vemos si ya esta borrado o aun no
    });

    //ver si existe ese usuario

    if (!usuario)
      return res.status(404).json({
        error: "Usuario no encontrado",
      });

    //agarramos la fecha actual

    const fechaActual = new Date();

    await usuario.update({
      is_deleted: true, //actualizamos a que esta borrado ahora si
      deleted_at: fechaActual, //agarramos la fecha de cuando se borro
      updated_by: updated_by || null, //agarramos el usuario quien lo borro
      updated_at: fechaActual,
      estado: false, //esto significa que esta borrado
    });

    // 7. Armar respuesta limpia
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
