const express = require("express");
const router = express.Router();
const reportesController = require("../controllers/reportes.controller");

router.post("/pagos", reportesController.pagosMensuales);
router.post("/ocupacion", reportesController.ocupacion);
router.post("/morosidad", reportesController.morosidad);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *
 *     Core.Pago:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         id_contrato:
 *           type: integer
 *         fecha:
 *           type: string
 *           format: date-time
 *         periodo:
 *           type: string
 *           format: date
 *         monto:
 *           type: number
 *         metodo:
 *           type: string
 *         estado_pago:
 *           type: string
 *         validado_por:
 *           type: integer
 *         validado_en:
 *           type: string
 *           format: date-time
 *         created_at:
 *           type: string
 *           format: date-time
 *         created_by:
 *           type: integer
 *
 *     Core.Cliente:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nombre:
 *           type: string
 *         apellido:
 *           type: string
 *         identificacion:
 *           type: string
 *         telefono:
 *           type: string
 *         correo:
 *           type: string
 *
 *     Core.Contrato:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         periodo_inicio:
 *           type: string
 *           format: date
 *         periodo_fin:
 *           type: string
 *           format: date
 *         monto:
 *           type: number
 *         deposito:
 *           type: number
 *         estado:
 *           type: string
 *
 *     Core.Apartamento:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         id_sucursal:
 *           type: integer
 *         numero_apartamento:
 *           type: integer
 *         descripcion:
 *           type: string
 *         precio_mensual:
 *           type: number
 *         estado_ocupacion:
 *           type: string
 *
 *     Core.Sucursal:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nombre:
 *           type: string
 *         ciudad:
 *           type: string
 *         sector:
 *           type: string
 *         calle:
 *           type: string
 *
 *     Reportes.Pagos.Request:
 *       type: object
 *       properties:
 *         fechaInicio:
 *           type: string
 *           format: date
 *         fechaFinal:
 *           type: string
 *           format: date
 *         sucursalId:
 *           type: integer
 *       required:
 *         - fechaInicio
 *         - fechaFinal
 *         - sucursalId
 *
 *     Reportes.Pagos.Response:
 *       type: object
 *       properties:
 *         mensaje:
 *           type: string
 *         reporte:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/Core.Pago"
 *
 *     Reportes.Ocupacion.Request:
 *       type: object
 *       properties:
 *         sucursalId:
 *           type: integer
 *       required:
 *         - sucursalId
 *
 *     Reportes.Ocupacion.Response:
 *       type: object
 *       properties:
 *         mensaje:
 *           type: string
 *         reporte:
 *           type: object
 *           properties:
 *             sucursalId:
 *               type: integer
 *             disponibles:
 *               type: integer
 *             ocupados:
 *               type: integer
 *             total:
 *               type: integer
 *
 *     Reportes.Morosidad.Request:
 *       type: object
 *       properties:
 *         sucursalId:
 *           type: integer
 *       required:
 *         - sucursalId
 *
 *     Reportes.Morosidad.Response:
 *       type: object
 *       properties:
 *         mensaje:
 *           type: string
 *         reporte:
 *           type: object
 *           properties:
 *             sucursalId:
 *               type: integer
 *             totalAtrasados:
 *               type: integer
 *             clientes:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Core.Cliente"
 */

/**
 * @swagger
 * tags:
 *   - name: Reportes
 *     description: Endpoints de reportes del sistema
 */

/**
 * @swagger
 * /reportes/pagos:
 *   post:
 *     summary: Reporte de pagos en un rango de fechas
 *     tags:
 *       - Reportes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Reportes.Pagos.Request"
 *     responses:
 *       200:
 *         description: Reporte generado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Reportes.Pagos.Response"
 *       400:
 *         description: Error en validación de fechas o sucursal
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /reportes/ocupacion:
 *   post:
 *     summary: Reporte de ocupación de apartamentos por sucursal
 *     tags:
 *       - Reportes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Reportes.Ocupacion.Request"
 *     responses:
 *       200:
 *         description: Reporte de ocupación generado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Reportes.Ocupacion.Response"
 *       400:
 *         description: Faltan parámetros
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /reportes/morosidad:
 *   post:
 *     summary: Reporte de clientes con pagos atrasados
 *     tags:
 *       - Reportes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Reportes.Morosidad.Request"
 *     responses:
 *       200:
 *         description: Reporte generado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Reportes.Morosidad.Response"
 *       400:
 *         description: Faltan parámetros
 *       500:
 *         description: Error del servidor
 */
