"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Notificacion extends Model {
    static associate(models) {
      // 1️⃣ Notificacion ↔ Usuario (N–1)
      Notificacion.belongsTo(models.Usuario, {
        foreignKey: "id_usuario",
        as: "usuario",
      });

      // 2️⃣ Notificacion ↔ Cliente (N–1)
      Notificacion.belongsTo(models.Cliente, {
        foreignKey: "id_cliente",
        as: "cliente",
      });

      // 3️⃣ Notificacion ↔ Contrato (N–1)
      Notificacion.belongsTo(models.Contrato, {
        foreignKey: "id_contrato",
        as: "contrato",
      });

      // 4️⃣ Notificacion ↔ Pago (N–1)
      Notificacion.belongsTo(models.Pago, {
        foreignKey: "id_pago",
        as: "pago",
      });
    }
  }

  Notificacion.init(
    {
      tipo: DataTypes.STRING(40),
      medio: DataTypes.STRING(30),
      estado: DataTypes.STRING(20),
      payload: DataTypes.TEXT,
      fecha_envio: DataTypes.DATE,

      id_usuario: DataTypes.INTEGER,
      id_cliente: DataTypes.INTEGER,
      id_contrato: DataTypes.INTEGER,
      id_pago: DataTypes.INTEGER,

      created_at: DataTypes.DATE,
      created_by: DataTypes.INTEGER,
      updated_at: DataTypes.DATE,
      updated_by: DataTypes.INTEGER,
      deleted_at: DataTypes.DATE,
      is_deleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      tableName: "notificaciones",
      modelName: "Notificacion",
      timestamps: false,
    }
  );

  return Notificacion;
};
