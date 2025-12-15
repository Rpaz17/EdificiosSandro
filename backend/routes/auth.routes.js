const { Router } = require("express");
const { login, me } = require("../controllers/auth.controller");
const authMiddleware = require("../controllers/auth.middleware");

const router = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     description: Valida las credenciales del usuario y devuelve un token JWT para autenticación.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login exitoso
 *       400:
 *         description: Datos inválidos o credenciales incorrectas
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.post("/login", login);
router.get("/me", authMiddleware,
    (req, res, next) => {
        res.set("Cache-Control", "no-store");
        next();
    },
    me
);

module.exports = router;
