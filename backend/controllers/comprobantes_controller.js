const comprobantesService = require("../services/comprobantes_service");

module.exports = {
  //POST /comprobantes

  subirComprobante: (request, response) => {
    const comprobante = comprobantesService.subirComprobante(request.body);

    response.status(201).json({
      mensaje: "voucher uploaded succesfully",
      voucher: comprobante,
    });
  },
};
