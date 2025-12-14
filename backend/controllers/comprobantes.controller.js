const comprobantesService = require("../services/comprobantes.service");

module.exports = {
  //POST /comprobantes

  listarComprobantes: async (req, res) => {
    // console.log("CONTROLLER HIT");
    // return res.json({ works: true });
    try {
      const comprobantes = await comprobantesService.listarComprobantes();
      const response = comprobantes.map((c) => ({
        id: c.id,
        estado: c.estado_validacion,
        archivo: c.ruta_archivo,
        fecha_subido: c.subido_en,

        pago: {
          id: c.pago.id,
          monto: c.pago.monto,
          metodo: c.pago.metodo,
          fecha: c.pago.fecha,
        },

        cliente: {
          id: c.pago.contrato.cliente.id,
          nombre: `${c.pago.contrato.cliente.nombre} ${c.pago.contrato.cliente.apellido}`,
          telefono: c.pago.contrato.cliente.telefono,
          correo: c.pago.contrato.cliente.correo,
        },
      }));
      return res.json(response);
    } catch (error) {
      console.error("Error al obtener comprobantes", error);
      return res.status(500).json({ error: "Error al obtener comprobantes" });
    }
  },
  subirComprobante: async (req, res) => {
    try {
      // 1. Validar archivo
      if (!req.file) {
        return res.status(400).json({
          error: "Debe enviar un archivo de comprobante",
        });
      }

      const data = {
        usuarioId: 1, // cambiar a req.user.id cuando funcionen tokens
        notas: req.body.notas || null,
        contratoId: req.body.contratoId,
        monto: req.body.monto,
        metodo: req.body.metodo,
        archivo: req.file.buffer,
        nombreArchivo: req.file.originalname,
      };

      const comprobante = await comprobantesService.subirComprobante(data);

      return res.status(201).json({
        mensaje: "voucher uploaded succesfully",
        voucher: comprobante,
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        error: error.message,
      });
    }
  },

  //PUT /comprobantes/:id/aprobar
  validarComprobante: async (request, response) => {
    const comprobanteId = request.params.id;
    const usuarioId = 1; // cambiar a req.user.id cuando funcionen tokens

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
    const usuarioId = 1; // cambiar a req.user.id cuando funcionen tokens

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
