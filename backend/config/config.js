require("dotenv").config(); // carga .env

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST || "db",
    dialect: process.env.DB_DIALECT,
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE + "_test",
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false, // desactiva logs de SQL en test
  },
  production: {
    use_env_variable: "DATABASE_URL", // para servicios cloud
    dialect: "postgres",
  },
};
