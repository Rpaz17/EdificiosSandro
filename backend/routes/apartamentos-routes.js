const express = require("express");
const router = express.Router();


const { crearApartamento } = require("../controllers/apartamentos-controller");

router.post("/apartamentos", crearApartamento);

module.exports = router;