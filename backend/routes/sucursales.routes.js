const express = require("express");
const router = express.Router();

const {
  crearSucursal,
  editarSucursal,
  obtenerSucursal,
  eliminarSucursal,
} = require("../controllers/sucursales.controller");

// Ruta para crear sucursales
router.post("/sucursales", crearSucursal);
router.get("/sucursales", obtenerSucursal);
router.delete("/sucursales", eliminarSucursal);
router.patch("/sucursales", editarSucursal);

module.exports = router;
