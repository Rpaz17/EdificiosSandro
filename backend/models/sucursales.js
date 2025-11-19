"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Sucursal extends Model {
    static associate(models) {
      Sucursal.hasMany(models.Apartamento, { foreignKey: "id_sucursal" });
    }
  }

  Sucursal.init(
    {
      nombre: { type: DataTypes.STRING(120), allowNull: false },
      ciudad: DataTypes.STRING(100),
      sector: DataTypes.STRING(100),
      calle: DataTypes.STRING(150),

      created_at: DataTypes.DATE,
      created_by: DataTypes.INTEGER,
      updated_at: DataTypes.DATE,
      updated_by: DataTypes.INTEGER,
      deleted_at: DataTypes.DATE,
      is_deleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      tableName: "sucursales",
      modelName: "Sucursal",
      timestamps: false,
    }
  );

  return Sucursal;
};
