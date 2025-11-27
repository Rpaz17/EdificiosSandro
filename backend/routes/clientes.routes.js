const express = require("express");
const router = express.Router();

// Importar controlador

const clientesController = require("../controllers/clientes.controller");

// POST /api/clientes >>  user controller
router.post("/clientes", clientesController.crearCliente);
router.patch("/clientes/:id", clientesController.editarCliente);
router.delete("/clientes/:id", clientesController.eliminarCliente);

module.exports = router;
