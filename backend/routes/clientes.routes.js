const express = require("express");
const router = express.Router();
// Importar controlador
const { crearCliente } = require("../controllers/clientes.controller");
const clientesController = require("../controllers/clientes.controller");

router.get("/clientes", clientesController.listarClientes);
// POST /api/clientes >>  user controller
router.post("/clientes", crearCliente);
router.patch("/clientes/asociar-usuario", clientesController.asociarUsuario);

// PATCH /api/clientes/:id/editar
router.patch("/clientes/:id", clientesController.editarCliente);
// PATCH /api/clientes/:id/ eliminar
router.delete("/clientes/:id", clientesController.eliminarCliente);

module.exports = router;

//Swagger documentation

/**
 * @swagger
 * components:
 *   schemas:
 *
 *     Clientes.Create.Request:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *         apellido:
 *           type: string
 *         correo:
 *           type: string
 *         telefono:
 *           type: string
 *         identificacion:
 *           type: string
 *         id_usuario:
 *           type: integer
 *         created_by:
 *           type: integer
 *       required:
 *         - nombre
 *         - apellido
 *
 *     Clientes.Create.Response:
 *       type: object
 *       properties:
 *         mensaje:
 *           type: string
 *         cliente:
 *           $ref: "#/components/schemas/Core.Cliente"
 *
 *     Clientes.Edit.Request:
 *       type: object
 *       properties:
 *         usuarioId:
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
 *       required:
 *         - usuarioId
 *
 *     Clientes.Edit.Response:
 *       type: object
 *       properties:
 *         mensaje:
 *           type: string
 *         cliente:
 *           $ref: "#/components/schemas/Core.Cliente"
 *
 *     Clientes.Delete.Request:
 *       type: object
 *       properties:
 *         usuarioId:
 *           type: integer
 *       required:
 *         - usuarioId
 *
 *     Clientes.Delete.Response:
 *       type: object
 *       properties:
 *         mensaje:
 *           type: string
 *         cliente:
 *           $ref: "#/components/schemas/Core.Cliente"
 */

/**
 * @swagger
 * tags:
 *   - name: Clientes
 *     description: Endpoints para la gestión de clientes
 */

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Crear un nuevo cliente
 *     tags:
 *       - Clientes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Clientes.Create.Request"
 *     responses:
 *       201:
 *         description: Cliente creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Clientes.Create.Response"
 *       400:
 *         description: Error en validación de datos (ej. correo inválido)
 *       404:
 *         description: Usuario asociado no existe
 *       409:
 *         description: Correo ya registrado
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /clientes/{id}:
 *   patch:
 *     summary: Editar un cliente existente
 *     tags:
 *       - Clientes
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente a modificar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Clientes.Edit.Request"
 *     responses:
 *       200:
 *         description: Cliente editado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Clientes.Edit.Response"
 *       400:
 *         description: Datos inválidos o sin campos para actualizar
 *       404:
 *         description: Cliente no encontrado
 *       410:
 *         description: El cliente ya ha sido eliminado
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /clientes/{id}:
 *   delete:
 *     summary: Eliminar (soft delete) un cliente
 *     tags:
 *       - Clientes
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente a eliminar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Clientes.Delete.Request"
 *     responses:
 *       200:
 *         description: Cliente eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Clientes.Delete.Response"
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Cliente no encontrado
 *       409:
 *         description: El cliente ya estaba eliminado
 *       500:
 *         description: Error interno del servidor
 */
