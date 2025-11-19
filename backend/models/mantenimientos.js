"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Mantenimiento extends Model {
    static associate(models) {
      Mantenimiento.belongsTo(models.Apartamento, {
        foreignKey: "id_apartamento",
      });
      Mantenimiento.belongsTo(models.Cliente, { foreignKey: "id_cliente" });
    }
  }

  Mantenimiento.init(
    {
      tipo: DataTypes.STRING(40),
      descripcion: DataTypes.TEXT,
      estado: DataTypes.STRING(20),
      id_apartamento: DataTypes.INTEGER,
      id_cliente: DataTypes.INTEGER,
      fecha_reporte: DataTypes.DATE,
      prioridad: DataTypes.INTEGER,

      created_at: DataTypes.DATE,
      created_by: DataTypes.INTEGER,
      updated_at: DataTypes.DATE,
      updated_by: DataTypes.INTEGER,
      deleted_at: DataTypes.DATE,
      is_deleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      tableName: "mantenimientos",
      modelName: "Mantenimiento",
      timestamps: false,
    }
  );

  return Mantenimiento;
};
