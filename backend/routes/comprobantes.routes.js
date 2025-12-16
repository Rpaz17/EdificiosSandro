const express = require("express");
const router = express.Router();
const comprobantesController = require("../controllers/comprobantes.controller");
const upload = require("../middlewares/upload");
const authMiddleware = require("../controllers/auth.middleware");

router.get("/comprobantes", comprobantesController.listarComprobantes);
//router.get("/comprobantes/:id", comprobantesController.obtenerComprobante);
router.post(
  "/comprobantes/subir",
  authMiddleware,
  upload.single("archivo"),
  comprobantesController.subirComprobante
);
//Agregar middleware de autenticacion para el usuario
router.patch(
  "/comprobantes/:id/aprobar",
  authMiddleware,
  comprobantesController.validarComprobante
);
//Agregar middleware de autenticacion para el usuario
router.patch(
  "/comprobantes/:id/rechazar",
  authMiddleware,
  comprobantesController.rechazarComprobante
);
//cambiar a delete
router.delete(
  "/comprobantes/:id/eliminar",
  comprobantesController.eliminarComprobante
);
module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Core.Comprobante:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         id_pago:
 *           type: integer
 *         ruta_archivo:
 *           type: string
 *         hash_archivo:
 *           type: string
 *         estado_validacion:
 *           type: string
 *           enum: [pendiente, validado, rechazado]
 *         subido_en:
 *           type: string
 *           format: date-time
 *         notas:
 *           type: string
 *         validado_por:
 *           type: integer
 *           nullable: true
 *         validado_en:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         created_at:
 *           type: string
 *           format: date-time
 *         created_by:
 *           type: integer
 *         updated_at:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         updated_by:
 *           type: integer
 *           nullable: true
 *         deleted_at:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         is_deleted:
 *           type: boolean
 *
 *     Comprobante.UploadRequest:
 *       type: object
 *       properties:
 *         id_pago:
 *           type: integer
 *         usuarioId:
 *           type: integer
 *         notas:
 *           type: string
 *           nullable: true
 *         archivo:
 *           type: string
 *           format: binary
 *       required:
 *         - id_pago
 *         - usuarioId
 *         - archivo
 *
 *     Comprobante.ActionBody:
 *       type: object
 *       properties:
 *         usuarioId:
 *           type: integer
 *       required:
 *         - usuarioId
 */

/**
 * @swagger
 * tags:
 *   - name: Comprobantes
 *     description: Endpoints para gestión de comprobantes de pago
 */

/**
 * @swagger
 * /comprobantes/subir:
 *   post:
 *     summary: Subir comprobante de pago
 *     description: Sube un archivo de comprobante y crea el registro asociado.
 *     tags:
 *       - Comprobantes
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: "#/components/schemas/Comprobante.UploadRequest"
 *     responses:
 *       201:
 *         description: Comprobante subido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 voucher:
 *                   $ref: "#/components/schemas/Core.Comprobante"
 *       400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /comprobantes/{id}/aprobar:
 *   patch:
 *     summary: Aprobar comprobante
 *     description: Cambia el estado del comprobante a "validado".
 *     tags:
 *       - Comprobantes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del comprobante
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Comprobante.ActionBody"
 *     responses:
 *       200:
 *         description: Comprobante aprobado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 comprobante:
 *                   $ref: "#/components/schemas/Core.Comprobante"
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Comprobante no encontrado
 *       409:
 *         description: El comprobante ya ha sido validado
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /comprobantes/{id}/rechazar:
 *   patch:
 *     summary: Rechazar comprobante
 *     description: Cambia el estado del comprobante a "rechazado".
 *     tags:
 *       - Comprobantes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del comprobante
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Comprobante.ActionBody"
 *     responses:
 *       200:
 *         description: Comprobante rechazado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 comprobante:
 *                   $ref: "#/components/schemas/Core.Comprobante"
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Comprobante no encontrado
 *       409:
 *         description: El comprobante ya ha sido validado
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /comprobantes/{id}/eliminar:
 *   delete:
 *     summary: Eliminar comprobante (soft delete)
 *     description: Marca un comprobante como eliminado siempre que ya haya sido validado.
 *     tags:
 *       - Comprobantes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del comprobante a eliminar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Comprobante.ActionBody"
 *     responses:
 *       200:
 *         description: Comprobante eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 comprobante:
 *                   $ref: "#/components/schemas/Core.Comprobante"
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Comprobante no encontrado
 *       409:
 *         description: No se puede eliminar un comprobante pendiente
 *       500:
 *         description: Error del servidor
 */
