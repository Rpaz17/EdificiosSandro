"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class AuditEvent extends Model {
    static associate(models) {
      AuditEvent.belongsTo(models.Usuario, { foreignKey: "changed_by" });
      AuditEvent.hasMany(models.AuditChange, { foreignKey: "audit_event_id" });
    }
  }

  AuditEvent.init(
    {
      table_name: DataTypes.STRING(100),
      entity_pk: DataTypes.STRING(80),
      action: DataTypes.STRING(10),
      changed_at: DataTypes.DATE,
      changed_by: DataTypes.INTEGER,
      trace_id: DataTypes.STRING(64),
      source: DataTypes.STRING(30),
      notes: DataTypes.TEXT,
    },
    {
      sequelize,
      tableName: "audit_event",
      modelName: "AuditEvent",
      timestamps: false,
    }
  );

  return AuditEvent;
};
