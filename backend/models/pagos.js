"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Pago extends Model {
    static associate(models) {
      // 1️⃣ Pago ↔ Contrato (N–1)
      Pago.belongsTo(models.Contrato, {
        foreignKey: "id_contrato",
        as: "contrato",
      });

      // 2️⃣ Pago ↔ Usuario (N–1) — usuario que validó el pago
      Pago.belongsTo(models.Usuario, {
        foreignKey: "validado_por",
        as: "validador",
      });

      // 3️⃣ Pago ↔ Comprobante (1–N)
      Pago.hasMany(models.Comprobante, {
        foreignKey: "id_pago",
        as: "comprobantes",
      });

      // 4️⃣ Pago ↔ Notificacion (1–N)
      Pago.hasMany(models.Notificacion, {
        foreignKey: "id_pago",
        as: "notificaciones",
      });
    }
  }

  Pago.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_contrato: DataTypes.INTEGER,
      fecha: DataTypes.DATE,
      periodo: DataTypes.DATEONLY,
      monto: DataTypes.DECIMAL(10, 2),
      metodo: DataTypes.STRING(40),
      estado_pago: DataTypes.STRING(20),
      row_version: DataTypes.BLOB,

      validado_por: DataTypes.INTEGER,
      validado_en: DataTypes.DATE,

      created_at: DataTypes.DATE,
      created_by: DataTypes.INTEGER,
      updated_at: DataTypes.DATE,
      updated_by: DataTypes.INTEGER,
      deleted_at: DataTypes.DATE,
      is_deleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      tableName: "pagos",
      modelName: "Pago",
      timestamps: false,
    }
  );

  return Pago;
};
