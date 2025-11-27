const express = require("express");
const router = express.Router();

const { crearContrato , editarContrato , getContratos , eliminarContrato} = require("../controllers/contratos.controller");

router.post("/contratos", crearContrato);
router.put("/contratos/:id", editarContrato);
router.get("/contratos", getContratos);
router.delete("/contratos/:id", eliminarContrato);

module.exports = router;