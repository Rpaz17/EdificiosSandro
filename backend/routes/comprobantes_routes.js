const express = require("express");
const router = express.Router();
const comprobantesController = require("../controllers/comprobantes_controller");
const upload = require("../middlewares/upload");

router.post(
  "/subir",
  upload.single("archivo"),
  comprobantesController.subirComprobante
);

router.patch("/:id/aprobar", comprobantesController.validarComprobante);
router.patch("/:id/rechazar", comprobantesController.rechazarComprobante);
router.patch("/:id/eliminar", comprobantesController.eliminarComprobante);
module.exports = router;
