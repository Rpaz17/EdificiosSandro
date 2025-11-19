"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Comprobante extends Model {
    static associate(models) {
      Comprobante.belongsTo(models.Pago, { foreignKey: "id_pago" });
      Comprobante.belongsTo(models.Usuario, { foreignKey: "validado_por" });
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
