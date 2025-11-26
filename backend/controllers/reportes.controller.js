const reportesService = require("../services/reportes.service");

module.exports = {
  pagosMensuales: async (req, res) => {
    const { fechaInicio, fechaFinal, sucursalId } = req.body;

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

    if (new Date(fechaInicio) > new Date(fechaFinal)) {
      return res.status(400).json({
        error: "La fecha inicial no puede ser mayor a la fecha final",
      });
    }

    if (!sucursalId) {
      return res.status(400).json({
        error: "El id de la sucursal es obligatorio",
      });
    }

    try {
      const reporte = await reportesService.pagosMensuales(
        sucursalId,
        fechaInicio,
        fechaFinal
      );

      return res.status(200).json({
        mensaje: "Reporte generado exitosamente",
        reporte,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
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
