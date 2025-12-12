"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Apartamento extends Model {
    static associate(models) {
      // 1️⃣ Apartamento ↔ Sucursal (N–1)
      Apartamento.belongsTo(models.Sucursal, {
        foreignKey: "id_sucursal",
        as: "sucursal",
      });

      // 2️⃣ Apartamento ↔ Contrato (1–N)
      Apartamento.hasMany(models.Contrato, {
        foreignKey: "id_apartamento",
        as: "contratos",
      });

      // 3️⃣ Apartamento ↔ Mantenimiento (1–N)
      Apartamento.hasMany(models.Mantenimiento, {
        foreignKey: "id_apartamento",
        as: "mantenimientos",
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
