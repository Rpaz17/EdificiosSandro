const express = require("express");
const router = express.Router();

// Importar controlador
const { crearCliente } = require("../controllers/clientes.controller");
const clientesController = require("../controllers/clientes.controller");

// POST /api/clientes >>  user controller
router.post("/clientes", crearCliente);

// PATCH /api/clientes/:id/editar
router.patch("/clientes/:id", clientesController.editarCliente);
// PATCH /api/clientes/:id/ eliminar
router.delete("/clientes/:id", clientesController.eliminarCliente);

module.exports = router;
