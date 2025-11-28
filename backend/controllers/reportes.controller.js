const reportesService = require("../services/reportes.service");

module.exports = {
  pagosMensuales: async (req, res) => {
    const { fechaInicio, fechaFinal, sucursalId } = req.body;

    // Validaciones iniciales
    if (!fechaInicio) {
      return res.status(400).json({
        error: "La fecha inicial del reporte es obligatoria",
      });
    }

    if (!fechaFinal) {
      return res.status(400).json({
        error: "La fecha final del reporte es obligatoria",
      });
    }

    if (!sucursalId) {
      return res.status(400).json({
        error: "El id de la sucursal es obligatorio",
      });
    }

    // Convertir fechas a objetos Date
    const inicio = new Date(fechaInicio);
    const final = new Date(fechaFinal);

    // Validar formato de fecha
    if (isNaN(inicio.getTime()) || isNaN(final.getTime())) {
      return res.status(400).json({
        error: "Formato de fecha inválido. Use YYYY-MM-DD",
      });
    }

    // Validar rango lógico
    if (inicio > final) {
      return res.status(400).json({
        error: "La fecha inicial no puede ser mayor a la fecha final",
      });
    }

    try {
      // Llamar a tu servicio con fechas YA convertidas
      const reporte = await reportesService.pagosMensuales(
        sucursalId,
        inicio,
        final
      );

      return res.status(200).json({
        mensaje: "Reporte generado exitosamente",
        reporte,
      });
    } catch (error) {
      console.error("Error en pagosMensuales:", error);
      return res.status(500).json({
        error: error.message || "Error al generar reporte",
      });
    }
  },

  ocupacion: async (req, res) => {
    const { sucursalId } = req.body;

    if (!sucursalId) {
      return res.status(400).json({
        error: "El id de la sucursal es obligatorio",
      });
    }
    try {
      const reporte = await reportesService.ocupacion(sucursalId);

      return res.status(200).json({
        mensaje: "Reporte generado exitosamente",
        reporte,
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        error: error.message,
      });
    }
  },
  morosidad: async (req, res) => {
    const { sucursalId } = req.body;

    if (!sucursalId) {
      return res.status(400).json({
        error: "El id de la sucursal es obligatorio",
      });
    }
    try {
      const reporte = await reportesService.clientesAtrasados(sucursalId);

      return res.status(200).json({
        mensaje: "Reporte generado exitosamente",
        reporte,
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        error: error.message,
      });
    }
  },
};
