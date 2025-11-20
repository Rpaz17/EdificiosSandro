const comprobantesService = require("../services/comprobantes_service");

module.exports = {
  //POST /comprobantes

  subirComprobante: async (req, response) => {
    const data = {
      id_pago: req.body.id_pago,
      usuarioId: req.body.usuarioId,
      notas: req.body.notas,

      archivo: req.file.buffer,
      nombreArchivo: req.file.originalname,
    };

    const comprobante = await comprobantesService.subirComprobante(data);

    response.status(201).json({
      mensaje: "voucher uploaded succesfully",
      voucher: comprobante,
    });
  },
};
