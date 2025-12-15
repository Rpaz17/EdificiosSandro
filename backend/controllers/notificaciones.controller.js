const { Notificacion } = require("../models");

// POST /api/notificaciones/internal
async function crearNotificacionInterna(req, res) {
  try {
    const {
      tipo,
      medio,
      mensaje,        
      id_usuario,
      id_cliente,
      id_contrato,
      id_pago,
      estado,           //por defecto "NO_LEIDA"
    } = req.body;

    if (!tipo || !medio || !mensaje || !id_usuario) {
      return res.status(400).json({
        mensaje: "tipo, medio, mensaje e id_usuario son obligatorios",
      });
    }

    const ahora = new Date();
    const usuarioAuditoria = req.user?.id || id_usuario;

    const notificacion = await Notificacion.create({
      tipo,
      medio,
      estado: estado || "NO_LEIDA",
      payload: mensaje,
      fecha_envio: ahora,

      id_usuario,
      id_cliente: id_cliente || null,
      id_contrato: id_contrato || null,
      id_pago: id_pago || null,

      created_at: ahora,
      created_by: usuarioAuditoria,
      updated_at: ahora,
      updated_by: usuarioAuditoria,
      deleted_at: null,
      is_deleted: false,
    });

    return res.status(201).json(notificacion);
  } catch (error) {
    console.error("Error al crear notificación interna:", error);
    return res.status(500).json({ mensaje: "Error interno del servidor" });
  }
}

//Endpoint para el usuario autenticado
// GET /api/notificaciones
// GET /api/notificaciones?estado=leida
// GET /api/notificaciones?estado=no-leida
async function obtenerNotificacionesUsuarioAutenticado(req, res) {
  try {
    
    const usuarioId =
      req.user?.id || req.usuario?.id_usuario; 

    if (!usuarioId) {
      return res.status(401).json({ mensaje: "Usuario no autenticado" });
    }

    const { estado } = req.query;

    const where = {
      id_usuario: usuarioId,
      is_deleted: false,
    };

    if (estado) {
      const estadoLower = estado.toLowerCase();
      if (estadoLower === "leida") {
        where.estado = "LEIDA";
      } else if (estadoLower === "no-leida" || estadoLower === "no_leida") {
        where.estado = "NO_LEIDA";
      }
    }

    const notificaciones = await Notificacion.findAll({
      where,
      order: [["fecha_envio", "DESC"]],
    });

    return res.json(notificaciones);
  } catch (error) {
    console.error("Error al obtener notificaciones:", error);
    return res.status(500).json({ mensaje: "Error interno del servidor" });
  }
}

module.exports = {
  crearNotificacionInterna,
  obtenerNotificacionesUsuarioAutenticado,
  
};
