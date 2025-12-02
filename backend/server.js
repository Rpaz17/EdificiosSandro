const express = require("express");
const app = express();
const PORT = 3000;
var swaggerJsDoc = require("swagger-jsdoc");
var swaggerUI = require("swagger-ui-express");

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

//endpoint de sucursales
const sucursalesRoutes = require("./routes/sucursales.routes");
app.use("/api", sucursalesRoutes);

//endpoint de clientes
const clientesRoutes = require("./routes/clientes.routes");
app.use("/api", clientesRoutes);

//endpoint de apartamentos
const apartamentosRoutes = require("./routes/apartamentos.routes");
app.use("/api", apartamentosRoutes);

//endpoint de comprobantes
const comprobantesRoutes = require("./routes/comprobantes.routes");
app.use("/api/comprobantes", comprobantesRoutes);

const reportesRoutes = require("./routes/reportes.routes");
app.use("/api/reportes", reportesRoutes);

//endpoint de contratos
const contratosRoutes = require("./routes/contratos.routes");
app.use("/api", contratosRoutes);

const notificacionesRoutes = require("./routes/notificaciones.routes");
app.use("/api/notificaciones", notificacionesRoutes);

//SWAGGER SETUP
const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Campus Connect Api Documentation",
      version: "0.1",
    },
    servers: [{ url: "http://localhost:3000/api" }],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// Aquí crearás tus endpoints reales
app.get("/clientes", (req, res) => {
  res.json({ mensaje: "Listado de clientes (endpoint de ejemplo)" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
