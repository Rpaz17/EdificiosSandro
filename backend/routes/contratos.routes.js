const express = require("express");
const router = express.Router();

const { crearContrato , editarContrato , getContratos , eliminarContrato} = require("../controllers/contratos.controller");

router.post("/contratos", crearContrato);
router.put("/contratos/:id", editarContrato);
router.get("/contratos", getContratos);
router.delete("/contratos/:id", eliminarContrato);

/**
 * @swagger
 * components:
 *   schemas:
 *     Contrato:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autogenerado del contrato
 *         id_cliente:
 *           type: integer
 *           description: ID del cliente asociado al contrato
 *         id_apartamento:
 *           type: integer
 *           description: ID del apartamento asociado
 *         periodo_inicio:
 *           type: string
 *           format: date
 *           description: Fecha de inicio del contrato
 *         periodo_fin:
 *           type: string
 *           format: date
 *           description: Fecha de finalización del contrato
 *         monto:
 *           type: number
 *           format: float
 *           description: Monto total del contrato
 *         deposito:
 *           type: number
 *           format: float
 *           description: Monto del depósito
 *         estado:
 *           type: string
 *           description: Estado del contrato (activo, finalizado, cancelado, etc.)
 *         is_deleted:
 *           type: boolean
 *           description: Indica si el contrato fue eliminado lógicamente
 *         deleted_at:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora de eliminación lógica
 */


//POST
/**
 * @swagger
 * /contratos:
 *   post:
 *     summary: Crear un nuevo contrato
 *     tags: [Contratos]
 *     description: Crea un contrato asociado a un cliente y un apartamento. Valida que el cliente y el apartamento existan y que el apartamento no esté ocupado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_cliente:
 *                 type: integer
 *               id_apartamento:
 *                 type: integer
 *               periodo_inicio:
 *                 type: string
 *                 format: date
 *               periodo_fin:
 *                 type: string
 *                 format: date
 *               monto:
 *                 type: number
 *                 format: float
 *               deposito:
 *                 type: number
 *                 format: float
 *               estado:
 *                 type: string
 *             required:
 *               - id_cliente
 *               - id_apartamento
 *               - periodo_inicio
 *               - periodo_fin
 *               - monto
 *     responses:
 *       201:
 *         description: Contrato creado exitosamente
 *       400:
 *         description: El apartamento ya está ocupado o datos inválidos
 *       404:
 *         description: Cliente o apartamento no encontrado
 *       500:
 *         description: Error al crear el contrato
 */

//GET
/**
 * @swagger
 * /contratos:
 *   get:
 *     summary: Obtener todos los contratos
 *     tags: [Contratos]
 *     description: Retorna la lista de contratos registrados en el sistema. (Si se implementa soft delete, debería devolver solo los que no están eliminados).
 *     responses:
 *       200:
 *         description: Lista de contratos obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contrato'
 *       500:
 *         description: Error al obtener los contratos
 */

//DELETE
/**
 * @swagger
 * /contratos/{id}:
 *   delete:
 *     summary: Eliminar un contrato
 *     tags: [Contratos]
 *     description: Elimina permanentemente un contrato del sistema.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del contrato a eliminar
 *     responses:
 *       200:
 *         description: Contrato eliminado exitosamente
 *       404:
 *         description: Contrato no encontrado
 *       500:
 *         description: Error al eliminar el contrato
 */


module.exports = router;