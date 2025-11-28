"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "pagos",
      [
        {
          id_contrato: 1, // asegúrate que exista un contrato con ID 1
          fecha: new Date("2025-01-05"),
          periodo: "2025-01-01",
          monto: 250.0,
          metodo: "transferencia",
          estado_pago: "pendiente",
          row_version: null,

          validado_por: null,
          validado_en: null,

          created_at: new Date(),
          created_by: 1,
          updated_at: new Date(),
          updated_by: 1,
          deleted_at: null,
          is_deleted: false,
        },
        {
          id_contrato: 1,
          fecha: new Date("2025-02-05"),
          periodo: "2025-02-01",
          monto: 250.0,
          metodo: "efectivo",
          estado_pago: "pagado",
          row_version: null,

          validado_por: 1,
          validado_en: new Date("2025-02-06"),

          created_at: new Date(),
          created_by: 1,
          updated_at: new Date(),
          updated_by: 1,
          deleted_at: null,
          is_deleted: false,
        },
        {
          id_contrato: 2, // otro contrato opcional
          fecha: new Date("2025-01-10"),
          periodo: "2025-01-01",
          monto: 300.0,
          metodo: "tarjeta",
          estado_pago: "pendiente",
          row_version: null,

          validado_por: null,
          validado_en: null,

          created_at: new Date(),
          created_by: 1,
          updated_at: new Date(),
          updated_by: 1,
          deleted_at: null,
          is_deleted: false,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("pagos", null, {});
  },
};
