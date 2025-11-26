const express = require("express");
const router = express.Router();

const { crearContrato , editarContrato } = require("../controllers/contratos.controller");

router.post("/contratos", crearContrato);
router.put("/contratos/:id", editarContrato);

module.exports = router;