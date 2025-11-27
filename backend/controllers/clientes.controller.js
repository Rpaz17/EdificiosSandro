const { Cliente, Usuario } = require("../models");
const { eliminarApartamento } = require("./apartamentos.controller");

// Sanitizador
const clean = (str = "") => String(str).trim();

// ===============================
// CONTROLADOR: Crear nuevo cliente
// ===============================
module.exports = {
  crearCliente: async (req, res) => {
    try {
      let {
        nombre,
        apellido,
        correo,
        telefono,
        identificacion,
        id_usuario,
        created_by,
      } = req.body;

      // 1. Validar campos obligatorios
      if (!nombre || !apellido) {
        return res.status(400).json({
          error: "Los campos nombre y apellido son obligatorios.",
        });
      }

      // Sanitizar
      nombre = clean(nombre);
      apellido = clean(apellido);
      correo = correo ? clean(correo).toLowerCase() : null;
      telefono = telefono ? clean(telefono) : null;
      identificacion = identificacion ? clean(identificacion) : null;

      // 2. Validar formato de correo (si viene)
      if (correo) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo)) {
          return res.status(400).json({ error: "Correo no válido." });
        }
      }

      // 3. Verificar duplicado de correo
      if (correo) {
        const existeCorreo = await Cliente.findOne({
          where: { correo, is_deleted: false },
        });

        if (existeCorreo) {
          return res.status(409).json({
            error: "Ya existe un cliente registrado con ese correo.",
          });
        }
      }

      // 4. Validar usuario asociado (si viene)
      if (id_usuario) {
        const user = await Usuario.findByPk(id_usuario);

        if (!user) {
          return res.status(404).json({
            error: "El usuario asociado no existe.",
          });
        }
      }

      // 5. Crear cliente
      const nuevoCliente = await Cliente.create({
        id_usuario: id_usuario || null,
        nombre,
        apellido,
        identificacion,
        correo,
        telefono,
        created_at: new Date(),
        created_by: created_by || null,
        is_deleted: false,
      });

      // 6. Respuesta limpia
      const clienteResp = {
        id: nuevoCliente.id,
        nombre: nuevoCliente.nombre,
        apellido: nuevoCliente.apellido,
        identificacion: nuevoCliente.identificacion,
        correo: nuevoCliente.correo,
        telefono: nuevoCliente.telefono,
        id_usuario: nuevoCliente.id_usuario,
        created_at: nuevoCliente.created_at,
      };

      return res.status(201).json({
        mensaje: "Cliente registrado exitosamente",
        cliente: clienteResp,
      });
    } catch (error) {
      console.error("Error al crear cliente:", error);
      return res.status(500).json({
        error: "Error interno del servidor",
      });
    }
  },

  editarCliente: async (req, res) => {
    const clienteId = req.params.id;
    const usuarioId = req.body.usuarioId;
    const data = req.body;

    if (!clienteId) {
      return res.status(400).json({
        error: "El parámetro 'id' es obligatorio en la URL",
      });
    }

    if (isNaN(Number(clienteId))) {
      return res.status(400).json({
        error: "El ID del cliente debe ser un número válido",
      });
    }
    if (isNaN(Number(usuarioId))) {
      return res.status(400).json({
        error: "El usuarioId debe ser un número válido",
      });
    }

    // Nada que actualizar
    const camposActualizables = [
      "nombre",
      "apellido",
      "identificacion",
      "telefono",
      "correo",
    ];
    const tieneCampos = camposActualizables.some(
      (campo) => data[campo] !== undefined
    );

    if (!tieneCampos) {
      return res.status(400).json({
        error: "Debe enviar al menos un campo para actualizar",
      });
    }

    try {
      const cliente = await clientesService.editarCliente(
        clienteId,
        data,
        usuarioId
      );

      return res.status(200).json({
        mensaje: "Cliente actualizado exitosamente",
        cliente,
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        error: error.message,
      });
    }
  },

  eliminarCliente: async (req, res) => {
    const clienteId = req.params.id;
    const usuarioId = req.body.usuarioId;

    if (!usuarioId) {
      return res.status(400).json({ error: "usuarioId es obligatorio" });
    }

    try {
      const cliente = await clientesService.eliminarCliente(
        clienteId,
        usuarioId
      );

      return res.status(200).json({
        mensaje: "Cliente eliminado exitosamente",
        cliente,
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        error: error.message,
      });
    }
  },
};
