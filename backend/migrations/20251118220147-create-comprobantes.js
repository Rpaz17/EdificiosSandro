"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("comprobantes", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      id_pago: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "pagos",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        // Si se borra un pago, lo normal es eliminar sus comprobantes también.
      },

      ruta_archivo: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      hash_archivo: {
        type: Sequelize.STRING(128),
        allowNull: true,
      },

      estado_validacion: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: "pendiente",
      },

      subido_en: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("NOW()"),
      },

      notas: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      validado_por: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "usuarios",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },

      validado_en: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("comprobantes");
  },
};
