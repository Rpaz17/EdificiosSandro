"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Apartamento extends Model {
    static associate(models) {
      Apartamento.belongsTo(models.Sucursal, { foreignKey: "id_sucursal" });
      Apartamento.hasMany(models.Contrato, { foreignKey: "id_apartamento" });
      Apartamento.hasMany(models.Mantenimiento, {
        foreignKey: "id_apartamento",
      });
    }
  }

  Apartamento.init(
    {
      id_sucursal: { type: DataTypes.INTEGER, allowNull: false },
      numero_apartamento: { type: DataTypes.INTEGER, allowNull: false },
      descripcion: DataTypes.TEXT,
      precio_mensual: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      estado_ocupacion: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: "disponible",
      },

      created_at: DataTypes.DATE,
      created_by: DataTypes.INTEGER,
      updated_at: DataTypes.DATE,
      updated_by: DataTypes.INTEGER,
      deleted_at: DataTypes.DATE,
      is_deleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      tableName: "apartamentos",
      modelName: "Apartamento",
      timestamps: false,
    }
  );

  return Apartamento;
};
