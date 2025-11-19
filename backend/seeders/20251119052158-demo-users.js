"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "usuarios",
      [
        {
          email: "admin@example.com",
          password_hash: "$2b$10$abcdefghijklmnopqrstuv", // <-- deberías poner uno real
          rol: "admin",
          estado: true,
          created_at: new Date(),
          created_by: 1,
          updated_at: new Date(),
          updated_by: 1,
          deleted_at: null,
          is_deleted: false,
        },
        {
          email: "cliente@example.com",
          password_hash: "$2b$10$abcdefghijklmnopqrstuv",
          rol: "cliente",
          estado: true,
          created_at: new Date(),
          created_by: 1,
          updated_at: new Date(),
          updated_by: 1,
          deleted_at: null,
          is_deleted: false,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("usuarios", null, {});
  },
};
