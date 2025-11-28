const comprobantesService = require("../services/comprobantes.service");

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

  //PUT /comprobantes/:id/aprobar
  validarComprobante: async (request, response) => {
    const comprobanteId = request.params.id;
    const usuarioId = request.body.usuarioId;

    // 1. Validar ID del comprobante
    if (!comprobanteId) {
      return response.status(400).json({
        error: "El parámetro 'id' es obligatorio en la URL",
      });
    }

    // 2. Validar número de comprobanteId
    if (isNaN(Number(comprobanteId))) {
      return response.status(400).json({
        error: "El ID del comprobante debe ser un número válido",
      });
    }

    // 3. Validar usuarioId
    if (!usuarioId) {
      return response.status(400).json({
        error: "El 'usuarioId' es obligatorio en el cuerpo de la petición",
      });
    }

    // 4. Validar número de usuarioId
    if (isNaN(Number(usuarioId))) {
      return response.status(400).json({
        error: "El usuarioId debe ser un número válido",
      });
    }

    try {
      const comprobante = await comprobantesService.validarComprobante(
        comprobanteId,
        usuarioId
      );

      return response.status(200).json({
        mensaje: "Comprobante aprobado exitosamente",
        comprobante,
      });
    } catch (error) {
      return response.status(error.statusCode || 500).json({
        error: error.message,
      });
    }
  },

  rechazarComprobante: async (request, response) => {
    const comprobanteId = request.params.id;
    const usuarioId = request.body.usuarioId;

    // 1. Validar ID del comprobante
    if (!comprobanteId) {
      return response.status(400).json({
        error: "El parámetro 'id' es obligatorio en la URL",
      });
    }

    // 2. Validar número de comprobanteId
    if (isNaN(Number(comprobanteId))) {
      return response.status(400).json({
        error: "El ID del comprobante debe ser un número válido",
      });
    }

    // 3. Validar usuarioId
    if (!usuarioId) {
      return response.status(400).json({
        error: "El 'usuarioId' es obligatorio en el cuerpo de la petición",
      });
    }

    // 4. Validar número de usuarioId
    if (isNaN(Number(usuarioId))) {
      return response.status(400).json({
        error: "El usuarioId debe ser un número válido",
      });
    }

    try {
      const comprobante = await comprobantesService.rechazarComprobante(
        comprobanteId,
        usuarioId
      );

      return response.status(200).json({
        mensaje: "Comprobante rechazado exitosamente",
        comprobante,
      });
    } catch (error) {
      return response.status(error.statusCode || 500).json({
        error: error.message,
      });
    }
  },

  eliminarComprobante: async (request, response) => {
    const comprobanteId = request.params.id;
    const usuarioId = request.body.usuarioId;
    // 1. Validar ID del comprobante
    if (!comprobanteId) {
      return response.status(400).json({
        error: "El parámetro 'id' es obligatorio en la URL",
      });
    }

    // 2. Validar número de comprobanteId
    if (isNaN(Number(comprobanteId))) {
      return response.status(400).json({
        error: "El ID del comprobante debe ser un número válido",
      });
    }

    // 3. Validar usuarioId
    if (!usuarioId) {
      return response.status(400).json({
        error: "El 'usuarioId' es obligatorio en el cuerpo de la petición",
      });
    }

    // 4. Validar número de usuarioId
    if (isNaN(Number(usuarioId))) {
      return response.status(400).json({
        error: "El usuarioId debe ser un número válido",
      });
    }
    try {
      const comprobante = await comprobantesService.eliminarComprobante(
        comprobanteId,
        usuarioId
      );
      return response.status(200).json({
        mensaje: "Comprobante marcado como deleted",
        comprobante,
      });
    } catch (error) {
      return response.status(error.statusCode || 500).json({
        error: error.message,
      });
    }
  },
};
