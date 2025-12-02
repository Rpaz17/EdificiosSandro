const express = require("express");
const router = express.Router();

// Importar controlador

const {
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
} = require("../controllers/usuarios.controller");

// POST /api/usuarios → Usar el controller
router.post("/usuarios", crearUsuario);

router.put("/usuarios/:id", editarUsuario);

router.delete("/usuarios/:id", eliminarUsuario);

module.exports = router;
