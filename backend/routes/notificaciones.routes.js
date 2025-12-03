// routes/notificaciones.routes.js
const { Router } = require("express");
const {
  crearNotificacionInterna,
  obtenerNotificacionesUsuarioAutenticado,
} = require("../controllers/notificaciones.controller");

const authMiddleware = require("../controllers/auth.middleWare");

const router = Router();

// Para uso interno del backend (puedes dejarla sin auth si solo la usa backend)
router.post("/internal", crearNotificacionInterna);

/**
 * @swagger
 * /notificaciones:
 *   get:
 *     summary: Obtener notificaciones del usuario autenticado
 *     tags: [Notificaciones]
 *     description: Retorna las notificaciones del usuario autenticado, con opción de filtrar por estado (leida / no-leida).
 *     parameters:
 *       - in: query
 *         name: estado
 *         schema:
 *           type: string
 *           description: Estado de la notificación (leida, no-leida)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de notificaciones.
 *       401:
 *         description: Usuario no autenticado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/", authMiddleware, obtenerNotificacionesUsuarioAutenticado);

module.exports = router;
