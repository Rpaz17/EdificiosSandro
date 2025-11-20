const express = require("express");
const router = express.Router();
const comprobantesController = require("../controllers/comprobantes_controller");
const upload = require("../middlewares/upload");

router.post(
  "/subir",
  upload.single("archivo"),
  comprobantesController.subirComprobante
);

module.exports = router;
