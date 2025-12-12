"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      // 1️⃣ Usuario ↔ Cliente (1–1)
      Usuario.hasOne(models.Cliente, {
        foreignKey: "id_usuario",
        as: "cliente",
      });

      // 2️⃣ Usuario ↔ Pago (1–N) — pagos validados por el usuario
      Usuario.hasMany(models.Pago, {
        foreignKey: "validado_por",
        as: "pagos_validados",
      });

      // 3️⃣ Usuario ↔ Comprobante (1–N) — comprobantes validados por el usuario
      Usuario.hasMany(models.Comprobante, {
        foreignKey: "validado_por",
        as: "comprobantes_validados",
      });

      // 4️⃣ Usuario ↔ Notificacion (1–N)
      Usuario.hasMany(models.Notificacion, {
        foreignKey: "id_usuario",
        as: "notificaciones",
      });

      // 5️⃣ Usuario ↔ AuditEvent (1–N)
      Usuario.hasMany(models.AuditEvent, {
        foreignKey: "changed_by",
        as: "audit_events",
      });
    }
  }

  Usuario.init(
    {
      email: { type: DataTypes.STRING(120), allowNull: false, unique: true },
      password_hash: { type: DataTypes.STRING(255), allowNull: false },
      rol: {
        type: DataTypes.ENUM("admin", "cobrador", "cliente"),
        allowNull: false,
        defaultValue: "cliente",
      },
      estado: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },

      // Auditoría
      created_at: DataTypes.DATE,
      created_by: DataTypes.INTEGER,
      updated_at: DataTypes.DATE,
      updated_by: DataTypes.INTEGER,
      deleted_at: DataTypes.DATE,
      is_deleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      tableName: "usuarios",
      modelName: "Usuario",
      timestamps: false,
    }
  );

  return Usuario;
};
