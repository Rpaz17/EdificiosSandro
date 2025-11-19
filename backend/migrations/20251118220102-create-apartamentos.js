"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("apartamentos", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      id_sucursal: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "sucursales",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
        // Puedes cambiarlo a CASCADE si quieres que se borren apartamentos al borrar sucursal
      },

      numero_apartamento: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      descripcion: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      precio_mensual: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },

      estado_ocupacion: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: "disponible",
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
    await queryInterface.addConstraint("apartamentos", {
      fields: ["id_sucursal", "numero_apartamento"],
      type: "unique",
      name: "unique_sucursal_apartamento",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "apartamentos",
      "unique_sucursal_apartamento"
    );
    await queryInterface.dropTable("apartamentos");
  },
};
