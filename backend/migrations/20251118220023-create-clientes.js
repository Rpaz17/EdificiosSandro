"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("clientes", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "usuarios", // tabla referenciada
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL", // porque dijiste que es opcional
      },

      nombre: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },

      apellido: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },

      identificacion: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },

      telefono: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },

      correo: {
        type: Sequelize.STRING(120),
        allowNull: true,
      },

      // Auditoría
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("NOW()"),
      },

      created_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      updated_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      is_deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("clientes");
  },
};
