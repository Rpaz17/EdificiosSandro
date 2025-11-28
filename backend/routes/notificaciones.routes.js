const { Router } = require("express");
const {
  crearNotificacionInterna,
  obtenerNotificacionesUsuarioAutenticado,
} = require("../controllers/notificaciones.controller");

// Ajusta el nombre según tu proyecto
const authMiddleware = require("../controllers/auth.middleware");

const router = Router();

// Endpoint pensado para uso interno del backend
router.post("/internal", crearNotificacionInterna);

// Endpoint para obtener notificaciones del usuario autenticado
//router.get("/", authMiddleware, obtenerNotificacionesUsuarioAutenticado);

module.exports = router;
