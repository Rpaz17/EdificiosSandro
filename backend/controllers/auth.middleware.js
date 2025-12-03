// controllers/auth.middleware.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Debe venir: Authorization: Bearer <token>
  if (!authHeader) {
    return res.status(401).json({ mensaje: "Token no proporcionado" });
  }

  const partes = authHeader.split(" ");
  if (partes.length !== 2 || partes[0] !== "Bearer") {
    return res.status(401).json({ mensaje: "Formato de token inválido" });
  }

  const token = partes[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "CLAVE_SUPER_SECRETA"
    );
    req.user = decoded; // { id, email, rol }
    next();
  } catch (error) {
    console.error("Error al verificar token:", error);
    return res.status(401).json({ mensaje: "Token inválido o expirado" });
  }
};
