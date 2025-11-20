const express = require("express");
const router = express.Router();

const { crearContrato } = require("../controllers/contratos.controller");
router.post("/contratos", crearContrato);

module.exports = router;