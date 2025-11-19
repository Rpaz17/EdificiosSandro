"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("mantenimientos", {
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

      descripcion: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      estado: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: "abierto",
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
        // Normalmente no quieres borrar apartamentos que tienen mantenimientos registrados
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
        // quien lo reportó es opcional
      },

      fecha_reporte: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("NOW()"),
      },

      prioridad: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 2, // 1 alta, 2 media, 3 baja
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
    await queryInterface.dropTable("mantenimientos");
  },
};
