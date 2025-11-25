const express = require("express");
const router = express.Router();


const { crearApartamento, getApartamentos, getApartamentosById } = require("../controllers/apartamentos.controller");

router.post("/apartamentos", crearApartamento);
router.get("/getApt", getApartamentos);
router.get("/getAptById/:id", getApartamentosById);

module.exports = router;