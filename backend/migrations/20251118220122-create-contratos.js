"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("contratos", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      id_cliente: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "clientes",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },

      id_apartamento: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "apartamentos",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },

      periodo_inicio: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },

      periodo_fin: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },

      monto: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },

      deposito: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0,
      },

      estado: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: "activo",
      },

      row_version: {
        type: Sequelize.BLOB, // bytea = BLOB en Sequelize
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
    await queryInterface.dropTable("contratos");
  },
};
