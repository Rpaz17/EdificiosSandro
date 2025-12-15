// seed-admin.js
const bcrypt = require("bcrypt");
const { Usuario } = require("../models");

(async () => {
  const hashed = await bcrypt.hash("admin123", 10);

  await Usuario.create({
    email: "admin@local.dev",
    password_hash: hashed,
    rol: "admin",
  });

  console.log("✅ Admin user created");
  process.exit();
})();
