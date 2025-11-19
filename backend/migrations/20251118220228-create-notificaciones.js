"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("notificaciones", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      tipo: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },

      medio: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },

      estado: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: "pendiente",
      },

      payload: {
        type: Sequelize.TEXT,
        allowNull: false, // almacena JSON, base64, texto, etc.
      },

      fecha_envio: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "usuarios",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },

      id_cliente: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "clientes",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },

      id_contrato: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "contratos",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },

      id_pago: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "pagos",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
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
        allowNull: false,
        defaultValue: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("notificaciones");
  },
};
