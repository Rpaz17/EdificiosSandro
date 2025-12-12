"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Comprobante extends Model {
    static associate(models) {
      // 1️⃣ Comprobante ↔ Pago (N–1)
      Comprobante.belongsTo(models.Pago, {
        foreignKey: "id_pago",
        as: "pago",
      });

      // 2️⃣ Comprobante ↔ Usuario (N–1) — usuario que valida el comprobante
      Comprobante.belongsTo(models.Usuario, {
        foreignKey: "validado_por",
        as: "validador",
      });
    }
  }

  Comprobante.init(
    {
      id_pago: DataTypes.INTEGER,
      ruta_archivo: DataTypes.STRING(255),
      hash_archivo: DataTypes.STRING(128),
      estado_validacion: DataTypes.STRING(20),
      subido_en: DataTypes.DATE,
      notas: DataTypes.TEXT,

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
      tableName: "comprobantes",
      modelName: "Comprobante",
      timestamps: false,
    }
  );

  return Comprobante;
};
