"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("pagos", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      id_contrato: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "contratos",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },

      fecha: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("NOW()"),
      },

      periodo: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },

      monto: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },

      metodo: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },

      estado_pago: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: "pendiente",
      },

      row_version: {
        type: Sequelize.BLOB, // bytea
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

    // Índice único compuesto
    await queryInterface.addConstraint("pagos", {
      fields: ["id_contrato", "periodo"],
      type: "unique",
      name: "unique_pago_contrato_periodo",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "pagos",
      "unique_pago_contrato_periodo"
    );
    await queryInterface.dropTable("pagos");
  },
};
