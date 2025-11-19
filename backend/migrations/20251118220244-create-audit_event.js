"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("audit_event", {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      table_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },

      entity_pk: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },

      action: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },

      changed_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("NOW()"),
      },

      changed_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "usuarios",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },

      trace_id: {
        type: Sequelize.STRING(64),
        allowNull: true,
      },

      source: {
        type: Sequelize.STRING(30),
        allowNull: true,
        defaultValue: "app",
      },

      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    });

    // Índice: (table_name, entity_pk)
    await queryInterface.addIndex("audit_event", ["table_name", "entity_pk"], {
      name: "idx_audit_event_table_entity",
    });

    // Índice: (changed_at)
    await queryInterface.addIndex("audit_event", ["changed_at"], {
      name: "idx_audit_event_changed_at",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex(
      "audit_event",
      "idx_audit_event_table_entity"
    );
    await queryInterface.removeIndex(
      "audit_event",
      "idx_audit_event_changed_at"
    );
    await queryInterface.dropTable("audit_event");
  },
};
