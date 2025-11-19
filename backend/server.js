const express = require("express");
const app = express();
const PORT = 3000;

console.log("Cargando rutas desde:", __dirname);
console.log("Intentando cargar archivo: ./routes/usuarios.routes.js");

app.use(express.json());

// Endpoint de prueba
app.get("/", (req, res) => {
  res.send("Backend funcionando correctamente 🚀");
});

//endpoint de usuarios
const usuariosRoutes = require("./routes/usuarios.routes");
app.use("/api", usuariosRoutes);

// Aquí crearás tus endpoints reales
app.get("/clientes", (req, res) => {
  res.json({ mensaje: "Listado de clientes (endpoint de ejemplo)" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
