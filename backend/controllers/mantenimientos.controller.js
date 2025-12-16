const { Mantenimiento, Apartamento, Cliente } = require("../models");
const { notificacionARol, crearNotificacion } = require("../services/notificaciones.service");

//crear mantenimientos

exports.crearMantenimiento = async (req, res) => {
  try {
    const {
      tipo,
      descripcion,
      estado = "pendiente",
      id_apartamento,
      id_cliente,
      fecha_reporte,
      prioridad = 1,
      created_by,
    } = req.body;

    // Validaciones básicas
    if (!tipo || !descripcion || !id_apartamento || !id_cliente) {
      return res.status(400).json({
        error: "tipo, descripcion, id_apartamento e id_cliente son requeridos",
      });
    }

    const estadosValidos = ["pendiente", "en_proceso", "completado"];
    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({ error: "Estado inválido" });
    }

    const nuevo = await Mantenimiento.create({
      tipo,
      descripcion,
      estado,
      id_apartamento,
      id_cliente,
      fecha_reporte: fecha_reporte || new Date(),
      prioridad,
      created_by,
      created_at: new Date(),
      is_deleted: false,
    });

    try{
      const cliente = await Cliente.findByPk(id_cliente);
      const usuarioAuditoria = req.user?.id || created_by || null;

      // Primero se notifica al admin
      await notificacionARol({
        rol:"admin",
        tipo:"MANTENIMIENTO_PROGRAMADO",
        medio: "APP",
        mensaje: `Se ha programado un nuevo mantenimiento (${tipo}) para el apartamento ID ${id_apartamento}`,
        id_cliente: id_cliente,
        id_contrato: null,
        id_pago: null,
        created_by: usuarioAuditoria,
      });

      //Ahora notificamos al cliente si existe
      const id_user_cliente = cliente?.id_usuario || null;

      if(id_user_cliente){ 
        await crearNotificacion({
          tipo:"MANTENIMIENTO_PROGRAMADO",
          medio: "APP",
          mensaje: `Se ha programado un nuevo mantenimiento (${tipo}) para su apartamento.`,
          id_usuario: id_user_cliente,
          id_cliente: id_cliente,
          id_contrato: null,
          id_pago: null,
          created_by: usuarioAuditoria,
        });
      } else {
        console.warn(`El cliente ID ${id_cliente} no tiene un usuario asociado para notificar.`, {
          id_cliente,
        });
      }
    }catch(error){
      console.error("Error creando notificaciones de mantenimiento:", error);
    }
    res.status(201).json(nuevo);
  } catch (error) {
    console.error("Error en crear mantenimiento:", error);
    res.status(500).json({ error: "Error al crear mantenimiento" });
  }
};

//listar mantenimientos

exports.listarMantenimientos = async (req, res) => {
  try {
    const mantenimientos = await Mantenimiento.findAll({
      where: { is_deleted: false },
      include: [
        { model: Apartamento, as: "apartamento" },
        { model: Cliente, as: "cliente" },
      ],
    });

    res.json(mantenimientos);
  } catch (error) {
    console.error("Error en listar mantenimientos:", error);
    res.status(500).json({ error: "Error al obtener mantenimientos" });
  }
};

//obtener mantenimiento por id

exports.obtenerMantenimiento = async (req, res) => {
  try {
    const { id } = req.params;

    const mantenimiento = await Mantenimiento.findOne({
      where: { id, is_deleted: false },
      include: [
        { model: Apartamento, as: "apartamento" },
        { model: Cliente, as: "cliente" },
      ],
    });

    if (!mantenimiento) {
      return res.status(404).json({ error: "Mantenimiento no encontrado" });
    }

    res.json(mantenimiento);
  } catch (error) {
    console.error("Error en obtener mantenimiento:", error);
    res.status(500).json({ error: "Error al obtener mantenimiento" });
  }
};


// actualizar mantenimiento
exports.actualizarMantenimiento = async (req, res) => {
  try {
    const { id } = req.params;

    const mantenimiento = await Mantenimiento.findOne({
      where: { id, is_deleted: false },
    });

    if (!mantenimiento) {
      return res.status(404).json({ error: "Mantenimiento no encontrado" });
    }

    const {
      tipo,
      descripcion,
      estado,
      prioridad,
      id_apartamento,
      id_cliente,
      updated_by,
    } = req.body;

    const estadosValidos = ["pendiente", "en_proceso", "completado"];
    if (estado && !estadosValidos.includes(estado)) {
      return res.status(400).json({ error: "Estado inválido" });
    }

    if (prioridad && (prioridad < 1 || prioridad > 3)) {
      return res.status(400).json({ error: "Prioridad inválida" });
    }

    await mantenimiento.update({
      tipo,
      descripcion,
      estado,
      prioridad,
      id_apartamento,
      id_cliente,
      updated_by: updated_by || null,
      updated_at: new Date(),
    });

    res.json({
      message: "Mantenimiento actualizado correctamente",
      data: mantenimiento,
    });
  } catch (error) {
    console.error("Error en actualizar mantenimiento:", error);
    res.status(500).json({ error: "Error al actualizar mantenimiento" });
  }
};

//eliminar mantenimiento
exports.eliminarMantenimiento = async (req, res) => {
  try {
    const { id } = req.params;

    const mantenimiento = await Mantenimiento.findOne({
      where: { id, is_deleted: false },
    });

    if (!mantenimiento) {
      return res.status(404).json({ error: "Mantenimiento no encontrado" });
    }

    await mantenimiento.update({
      is_deleted: true,
      deleted_at: new Date(),
      updated_at: new Date(),
      updated_by: req.body.updated_by || null,
    });

    res.json({ message: "Mantenimiento eliminado correctamente" });
  } catch (error) {
    console.error("Error en eliminar mantenimiento:", error);
    res.status(500).json({ error: "Error al eliminar mantenimiento" });
  }
};
