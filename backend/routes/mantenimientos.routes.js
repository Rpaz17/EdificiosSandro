const express = require("express");
const router = express.Router();
const controller = require("../controllers/mantenimientos.controller");

/**
 * @swagger
 * tags:
 *   name: Mantenimientos
 *   description: Gestión de solicitudes de mantenimiento
 */

/**
 * @swagger
 * /mantenimientos:
 *   post:
 *     summary: Crear un mantenimiento
 *     tags: [Mantenimientos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               tipo:
 *                 type: string
 *                 description: Tipo de mantenimiento
 *               descripcion:
 *                 type: string
 *                 description: Descripción detallada
 *               estado:
 *                 type: string
 *                 description: Estado del mantenimiento (pendiente, en_proceso, completado)
 *               id_apartamento:
 *                 type: integer
 *                 description: ID del apartamento asociado
 *               id_cliente:
 *                 type: integer
 *                 description: ID del cliente que reporta
 *               fecha_reporte:
 *                 type: string
 *                 description: Fecha del reporte (opcional)
 *               prioridad:
 *                 type: integer
 *                 description: Nivel de prioridad (por defecto 1)
 *               created_by:
 *                 type: integer
 *                 description: ID del usuario que registra el mantenimiento
 *             required:
 *               - tipo
 *               - descripcion
 *               - id_apartamento
 *               - id_cliente
 *     responses:
 *       201:
 *         description: Mantenimiento creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *
 *       400:
 *         description: Campos requeridos faltantes o estado inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /mantenimientos:
 *   get:
 *     summary: Listar todos los mantenimientos
 *     tags: [Mantenimientos]
 *     responses:
 *       200:
 *         description: Lista de mantenimientos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *
 *       500:
 *         description: Error interno al obtener mantenimientos
 */

/**
 * @swagger
 * /mantenimientos/{id}:
 *   get:
 *     summary: Obtener un mantenimiento por ID
 *     tags: [Mantenimientos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del mantenimiento
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Mantenimiento encontrado
 *
 *       404:
 *         description: Mantenimiento no encontrado
 *
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /mantenimientos/{id}:
 *   put:
 *     summary: Actualizar un mantenimiento
 *     tags: [Mantenimientos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               tipo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               estado:
 *                 type: string
 *                 description: Estado válido (pendiente, en_proceso, completado)
 *               id_apartamento:
 *                 type: integer
 *               id_cliente:
 *                 type: integer
 *               prioridad:
 *                 type: integer
 *               updated_by:
 *                 type: integer
 *
 *     responses:
 *       200:
 *         description: Mantenimiento actualizado exitosamente
 *
 *       400:
 *         description: Estado inválido
 *
 *       404:
 *         description: Mantenimiento no encontrado
 *
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /mantenimientos/{id}:
 *   delete:
 *     summary: Eliminar un mantenimiento (soft delete)
 *     tags: [Mantenimientos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *
 *     requestBody:
 *       required: false
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               updated_by:
 *                 type: integer
 *
 *     responses:
 *       200:
 *         description: Mantenimiento eliminado correctamente
 *
 *       404:
 *         description: Mantenimiento no encontrado
 *
 *       500:
 *         description: Error interno del servidor
 */

// CRUD
router.post("mantenimientos/", controller.crearMantenimiento);
router.get("mantenimientos/", controller.listarMantenimientos);
router.get("mantenimientos/:id", controller.obtenerMantenimiento);
router.put("mantenimientos/:id", controller.actualizarMantenimiento);
router.delete("mantenimientos/:id", controller.eliminarMantenimiento);

module.exports = router;
