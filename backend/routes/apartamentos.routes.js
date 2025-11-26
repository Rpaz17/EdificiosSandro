const express = require("express");
const router = express.Router();


const { crearApartamento, getApartamentos, getApartamentosById, editarApartamento, eliminarApartamento } = require("../controllers/apartamentos.controller");

router.post("/apartamentos", crearApartamento);
router.get("/getApt", getApartamentos);
router.get("/getAptById/:id", getApartamentosById);
router.put("/apartamentos/:id", editarApartamento);
router.delete("/apartamentos/:id", eliminarApartamento);

module.exports = router;