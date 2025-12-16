const { Cliente, Usuario } = require("../models");
const clientesService = require("../services/clientes.service");
// Sanitizador
const clean = (str = "") => String(str).trim();
const { sequelize } = require("../models");

// ===============================
// CONTROLADOR: Crear nuevo cliente
// ===============================
module.exports = {
  listarClientes: async (req, res) => {
    console.log("Listar clientes");
    try {
      const clientes = await clientesService.listarClientes();
      const response = clientes.map((c) => {
        const contrato = c.contratos?.[0] ?? null;
        const pagos = contrato?.pagos ?? [];

        return {
          id: c.id,
          nombre: c.nombre,
          apellido: c.apellido,
          identificacion: c.identificacion,
          telefono: c.telefono,
          correo: c.correo,
          estado: c.estado,
          fecha_creacion: c.created_at,

          contrato: contrato
            ? {
                id: contrato.id,
                monto: contrato.monto,
                estado: contrato.estado,
              }
            : null,

          pagos: pagos.map((p) => ({
            id: p.id,
            fecha: p.fecha,
            monto: p.monto,
            metodo: p.metodo,
            estado: p.estado_pago,
          })),

          apartamento: contrato?.apartamento
            ? {
                numero: contrato.apartamento.numero_apartamento,
              }
            : null,

          sucursal: contrato?.apartamento?.sucursal
            ? {
                nombre: contrato.apartamento.sucursal.nombre,
              }
            : null,
        };
      });

      return res.json(response);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al obtener clientes" });
    }
  },
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
    const usuarioId = 1;
    const data = req.body;

    // Validaciones
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

    if (!usuarioId) {
      return res.status(400).json({
        error: "El usuarioId es obligatorio",
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

  asociarUsuario: async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const { correo } = req.body;

      const cliente = await Cliente.findOne({
        where: {
          correo,
          is_deleted: false,
        },
        transaction: t,
        lock: t.LOCK.UPDATE,
      });
      if (!cliente) {
        await t.rollback();
        return res.status(404).json({
          message: "Cliente no existe",
        });
      }
      console.log("DEBUG cliente:", {
        id: cliente.id,
        correo: cliente.correo,
        id_usuario: cliente.id_usuario,
        tipo: typeof cliente.id_usuario,
      });

      if (cliente.id_usuario) {
        return res.status(400).json({
          message: "El cliente ya tiene un usuario asociado",
        });
      }

      const usuario = await Usuario.findOne({
        where: {
          email: correo,
        },
        transaction: t,
      });

      if (!usuario) {
        await t.rollback();
        return res.status(404).json({
          message: "Usuario no existe",
        });
      }

      cliente.id_usuario = usuario.id;
      await cliente.save({ transaction: t });

      await t.commit();

      return res.status(200).json({
        message: "Usuario asociado al cliente correctamente",
        data: cliente,
      });
    } catch (error) {
      await t.rollback();
      console.error("Error al asociar usuario:", error);
      return res.status(500).json({
        message: "Error interno del servidor",
      });
    }
  },

  eliminarCliente: async (req, res) => {
    const clienteId = req.params.id;
    const usuarioId = 1;

    if (!clienteId) {
      return res
        .status(400)
        .json({ error: "El parámetro 'id' es obligatorio" });
    }

    if (isNaN(Number(clienteId))) {
      return res
        .status(400)
        .json({ error: "El ID del cliente debe ser válido" });
    }

    if (!usuarioId) {
      return res.status(400).json({ error: "El usuarioId es obligatorio" });
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
