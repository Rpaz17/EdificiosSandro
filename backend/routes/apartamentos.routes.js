const express = require("express");
const router = express.Router();


const { crearApartamento, getApartamentos, getApartamentosById, editarApartamento } = require("../controllers/apartamentos.controller");

router.post("/apartamentos", crearApartamento);
router.get("/getApt", getApartamentos);
router.get("/getAptById/:id", getApartamentosById);
router.put("/apartamentos/:id", editarApartamento);

module.exports = router;