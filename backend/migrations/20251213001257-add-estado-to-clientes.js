"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("clientes", "estado", {
      type: Sequelize.ENUM("activo", "inactivo"),
      allowNull: false,
      defaultValue: "activo",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("clientes", "estado");
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_clientes_estado";'
    );
  },
};
