"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Contrato extends Model {
    static associate(models) {
      // Contrato ↔ Cliente (N–1)
      Contrato.belongsTo(models.Cliente, {
        foreignKey: "id_cliente",
        as: "cliente",
      });

      // Contrato ↔ Apartamento (N–1)
      Contrato.belongsTo(models.Apartamento, {
        foreignKey: "id_apartamento",
        as: "apartamento",
      });

      // Contrato ↔ Pago (1–N)
      Contrato.hasMany(models.Pago, {
        foreignKey: "id_contrato",
        as: "pagos",
      });

      // Contrato ↔ Notificacion (1–N)
      Contrato.hasMany(models.Notificacion, {
        foreignKey: "id_contrato",
        as: "notificaciones",
      });
    }
  }

  Contrato.init(
    {
      id_cliente: DataTypes.INTEGER,
      id_apartamento: DataTypes.INTEGER,
      periodo_inicio: DataTypes.DATEONLY,
      periodo_fin: DataTypes.DATEONLY,
      monto: DataTypes.DECIMAL(10, 2),
      deposito: DataTypes.DECIMAL(10, 2),
      estado: DataTypes.STRING(20),
      row_version: DataTypes.BLOB,

      created_at: DataTypes.DATE,
      created_by: DataTypes.INTEGER,
      updated_at: DataTypes.DATE,
      updated_by: DataTypes.INTEGER,
      deleted_at: DataTypes.DATE,
      is_deleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      tableName: "contratos",
      modelName: "Contrato",
      timestamps: false,
    }
  );

  return Contrato;
};
