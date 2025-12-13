const express = require("express");
const router = express.Router();

router.get("/ping", (req, res) => {
  res.json({ pong: true });
});


/**
 * @swagger
 * tags:
 *   name: Sucursales
 *   description: Gestión de sucursales
 */

/**
 * @swagger
 * /sucursales:
 *   post:
 *     summary: Crear una nueva sucursal
 *     tags: [Sucursales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre de la sucursal
 *               ciudad:
 *                 type: string
 *                 description: Ciudad donde se ubica la sucursal
 *               sector:
 *                 type: string
 *                 description: Sector o colonia de la sucursal
 *               calle:
 *                 type: string
 *                 description: Calle o referencia exacta
 *               created_by:
 *                 type: integer
 *                 description: ID del usuario que realizó el registro
 *             required:
 *               - nombre
 *     responses:
 *       201:
 *         description: Sucursal registrada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 sucursal:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     nombre:
 *                       type: string
 *                     ciudad:
 *                       type: string
 *                     sector:
 *                       type: string
 *                     calle:
 *                       type: string
 *                     created_at:
 *                       type: string
 *
 *       400:
 *         description: Validación fallida (nombre requerido)
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
 * /sucursales/{id}:
 *   get:
 *     summary: Obtener una sucursal por ID
 *     tags: [Sucursales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la sucursal a consultar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sucursal encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 sucursal:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     nombre:
 *                       type: string
 *                     ciudad:
 *                       type: string
 *                     sector:
 *                       type: string
 *                     calle:
 *                       type: string
 *                     created_at:
 *                       type: string
 *                     updated_at:
 *                       type: string
 *
 *       404:
 *         description: Sucursal no encontrada
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
 * /sucursales/{id}:
 *   patch:
 *     summary: Actualizar una sucursal existente
 *     tags: [Sucursales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la sucursal a editar
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
 *               nombre:
 *                 type: string
 *               ciudad:
 *                 type: string
 *               sector:
 *                 type: string
 *               calle:
 *                 type: string
 *               updated_by:
 *                 type: integer
 *
 *     responses:
 *       200:
 *         description: Sucursal actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 sucursal:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     nombre:
 *                       type: string
 *                     ciudad:
 *                       type: string
 *                     sector:
 *                       type: string
 *                     calle:
 *                       type: string
 *                     updated_at:
 *                       type: string
 *
 *       404:
 *         description: Sucursal no encontrada
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
 * /sucursales/{id}:
 *   delete:
 *     summary: Eliminar una sucursal (soft delete)
 *     tags: [Sucursales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la sucursal a eliminar
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
 *         description: Sucursal eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *
 *       404:
 *         description: Sucursal no encontrada
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

const {
  crearSucursal,
  editarSucursal,
  listarSucursales,
  eliminarSucursal,
} = require("../controllers/sucursales.controller");


// Ruta para crear sucursales
router.post("/sucursales", crearSucursal);
router.get("/sucursales", listarSucursales);
router.delete("/sucursales/:id", eliminarSucursal);
router.patch("/sucursales/:id", editarSucursal);

module.exports = router;
