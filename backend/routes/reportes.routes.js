const express = require("express");
const router = express.Router();
const reportesController = require("../controllers/reportes.controller");

router.get("/pagos", reportesController.pagosMensuales);
router.get("/ocupacion", reportesController.ocupacion);
router.get("/morosidad", reportesController.morosidad);
