const express = require("express");
const router = express.Router();
const comprobantesController = require("../controllers/comprobantes_controller");

router.post("/subir", comprobantesController.subirComprobante);

module.exports = router;
