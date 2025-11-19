const { Cliente, Usuario } = require("../models");

// Sanitizador
const clean = (str = "") => String(str).trim();

// ===============================
// CONTROLADOR: Crear nuevo cliente
// ===============================
exports.crearCliente = async (req, res) => {
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
};
