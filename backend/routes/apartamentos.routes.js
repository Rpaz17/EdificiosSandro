const express = require("express");
const router = express.Router();


const { crearApartamento, getApartamentos, getApartamentosById, editarApartamento, eliminarApartamento } = require("../controllers/apartamentos.controller");

router.post("/apartamentos", crearApartamento);
router.get("/apartamentos", getApartamentos);
router.get("/getApt", getApartamentos);
router.get("/getAptById/:id", getApartamentosById);
router.put("/apartamentos/:id", editarApartamento);
router.delete("/apartamentos/:id", eliminarApartamento);

/**
 * @swagger
 * components:
 *   schemas:
 *     Apartamento:
 *       type: object
 *       required:
 *         - id_sucursal
 *         - numero_apartamento
 *         - descripcion
 *         - precio_mensual
 *         - estado_ocupacion
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autogenerado del apartamento
 *         id_sucursal:
 *           type: integer
 *           description: ID de la sucursal a la que pertenece el apartamento
 *         numero_apartamento:
 *           type: integer
 *           description: Número del apartamento
 *         descripcion:
 *           type: string
 *           description: Descripción del apartamento
 *         precio_mensual:
 *           type: number
 *           format: float
 *           description: Precio mensual del apartamento
 *         estado_ocupacion:
 *           type: string
 *           description: Estado del apartamento (disponible, ocupado, etc.)
 *         is_deleted:
 *           type: boolean
 *           description: Indica si el registro fue eliminado lógicamente
 *         deleted_at:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora en que se marcó como eliminado
 */

//POST
/**
 * @swagger
 * /apartamentos:
 *   post:
 *     summary: Crear un nuevo apartamento
 *     tags: [Apartamentos]
 *     description: Crea un nuevo apartamento asociado a una sucursal específica.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_sucursal:
 *                 type: integer
 *               numero_apartamento:
 *                 type: integer
 *               descripcion:
 *                 type: string
 *               precio_mensual:
 *                 type: number
 *                 format: float
 *               estado_ocupacion:
 *                 type: string
 *             required:
 *               - id_sucursal
 *               - numero_apartamento
 *               - descripcion
 *               - precio_mensual
 *               - estado_ocupacion
 *     responses:
 *       201:
 *         description: Apartamento creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Apartamento'
 *       400:
 *         description: Datos incompletos o inválidos
 *       404:
 *         description: La sucursal asignada no existe
 *       500:
 *         description: Error interno del servidor
 */


//GET
/**
 * @swagger
 * /getApt:
 *   get:
 *     summary: Obtener todos los apartamentos
 *     tags: [Apartamentos]
 *     description: Retorna la lista de todos los apartamentos que no han sido eliminados lógicamente.
 *     responses:
 *       200:
 *         description: Lista de apartamentos obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Apartamento'
 *       500:
 *         description: Error al obtener los apartamentos
 */

//GET BY ID
/**
 * @swagger
 * /getAptById/{id}:
 *   get:
 *     summary: Obtener un apartamento por ID
 *     tags: [Apartamentos]
 *     description: Retorna la información de un apartamento no eliminado lógicamente según su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del apartamento
 *     responses:
 *       200:
 *         description: Apartamento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Apartamento'
 *       404:
 *         description: Apartamento no encontrado
 *       500:
 *         description: Error al obtener el apartamento
 */


//PUT
/**
 * @swagger
 * /apartamentos/{id}:
 *   put:
 *     summary: Editar un apartamento
 *     tags: [Apartamentos]
 *     description: Actualiza los datos de un apartamento existente que no esté eliminado lógicamente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del apartamento a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_sucursal:
 *                 type: integer
 *               numero_apartamento:
 *                 type: integer
 *               descripcion:
 *                 type: string
 *               precio_mensual:
 *                 type: number
 *                 format: float
 *               estado_ocupacion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Apartamento actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Apartamento'
 *       404:
 *         description: Apartamento no encontrado
 *       500:
 *         description: Error al actualizar el apartamento
 */

//DELETE
/**
 * @swagger
 * /apartamentos/{id}:
 *   delete:
 *     summary: Eliminar (soft delete) un apartamento
 *     tags: [Apartamentos]
 *     description: Marca el apartamento como eliminado lógicamente estableciendo is_deleted en true.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del apartamento a eliminar
 *     responses:
 *       200:
 *         description: Apartamento eliminado correctamente
 *       404:
 *         description: Apartamento no encontrado
 *       500:
 *         description: Error al eliminar el apartamento
 */

module.exports = router;