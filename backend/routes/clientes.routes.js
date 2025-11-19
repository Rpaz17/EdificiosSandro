const express = require("express");
const router = express.Router();

// Importar controlador
const { crearCliente } = require("../controllers/clientes.controller");

// POST /api/clientes → usar controller
router.post("/clientes", crearCliente);

module.exports = router;
