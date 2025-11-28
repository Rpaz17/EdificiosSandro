"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Pago extends Model {
    static associate(models) {
      Pago.belongsTo(models.Contrato, { foreignKey: "id_contrato" });
      Pago.belongsTo(models.Usuario, { foreignKey: "validado_por" });
      Pago.hasMany(models.Comprobante, { foreignKey: "id_pago" });
      Pago.hasMany(models.Notificacion, { foreignKey: "id_pago" });
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
