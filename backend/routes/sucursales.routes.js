const express = require("express");
const router = express.Router();

const { crearSucursal } = require("../controllers/sucursales.controller");

// Ruta para crear sucursales
router.post("/sucursales", crearSucursal);

module.exports = router;
