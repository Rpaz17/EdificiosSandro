"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("audit_change", {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      audit_event_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "audit_event",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        // Si se elimina un audit_event, se deben eliminar sus cambios asociados
      },

      column_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },

      old_value: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      new_value: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("audit_change");
  },
};
