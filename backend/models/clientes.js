"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    static associate(models) {
      // 1️⃣ Cliente ↔ Usuario (N–1)
      Cliente.belongsTo(models.Usuario, {
        foreignKey: "id_usuario",
        as: "usuario",
      });

      // 2️⃣ Cliente ↔ Contrato (1–N)
      Cliente.hasMany(models.Contrato, {
        foreignKey: "id_cliente",
        as: "contratos",
      });

      // 3️⃣ Cliente ↔ Mantenimiento (1–N)
      Cliente.hasMany(models.Mantenimiento, {
        foreignKey: "id_cliente",
        as: "mantenimientos",
      });

      // 4️⃣ Cliente ↔ Notificacion (1–N)
      Cliente.hasMany(models.Notificacion, {
        foreignKey: "id_cliente",
        as: "notificaciones",
      });

      // (Optional / future)
      // Cliente.hasMany(models.Pago, {
      //   foreignKey: "id_cliente",
      //   as: "pagos",
      // });
    }
  }

  Cliente.init(
    {
      id_usuario: DataTypes.INTEGER,
      nombre: { type: DataTypes.STRING(100), allowNull: false },
      apellido: { type: DataTypes.STRING(100), allowNull: false },
      identificacion: DataTypes.STRING(30),
      telefono: DataTypes.STRING(20),
      correo: DataTypes.STRING(120),

      estado: {
        type: DataTypes.ENUM("activo", "inactivo"),
        allowNull: false,
        defaultValue: "activo",
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
      tableName: "clientes",
      modelName: "Cliente",
      timestamps: false,
    }
  );

  return Cliente;
};
