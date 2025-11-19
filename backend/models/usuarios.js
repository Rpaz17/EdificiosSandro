"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      Usuario.hasOne(models.Cliente, { foreignKey: "id_usuario" });
      Usuario.hasMany(models.Pago, { foreignKey: "validado_por" });
      Usuario.hasMany(models.Comprobante, { foreignKey: "validado_por" });
      Usuario.hasMany(models.Notificacion, { foreignKey: "id_usuario" });
      Usuario.hasMany(models.AuditEvent, { foreignKey: "changed_by" });
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
