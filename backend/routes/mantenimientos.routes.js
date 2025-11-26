const express = require("express");
const router = express.Router();
const controller = require("../controllers/mantenimientos.controller");

// CRUD
router.post("/", controller.crearMantenimiento);
router.get("/", controller.listarMantenimientos);
router.get("/:id", controller.obtenerMantenimiento);
router.put("/:id", controller.actualizarMantenimiento);
router.delete("/:id", controller.eliminarMantenimiento);

module.exports = router;
