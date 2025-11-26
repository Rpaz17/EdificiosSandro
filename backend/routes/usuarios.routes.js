const express = require("express");
const router = express.Router();

// Importar controlador
const {
  crearUsuario,
  eliminarUsuario,
} = require("../controllers/usuarios.controller");
const { editarUsuario } = require("../controllers/usuarios.controller");

const {
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
} = require("../controllers/usuarios.controller");

// Ruta de prueba
router.get("/test", (req, res) => {
  res.json({ mensaje: "Ruta usuarios OK" });
});

// POST /api/usuarios → Usar el controller
router.post("/usuarios", crearUsuario);

router.put("/usuarios/:id", editarUsuario);

router.delete("/usuarios/:id", eliminarUsuario);

module.exports = router;
