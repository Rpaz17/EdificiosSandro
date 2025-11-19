"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class AuditChange extends Model {
    static associate(models) {
      AuditChange.belongsTo(models.AuditEvent, {
        foreignKey: "audit_event_id",
      });
    }
  }

  AuditChange.init(
    {
      audit_event_id: DataTypes.BIGINT,
      column_name: DataTypes.STRING(100),
      old_value: DataTypes.TEXT,
      new_value: DataTypes.TEXT,
    },
    {
      sequelize,
      tableName: "audit_change",
      modelName: "AuditChange",
      timestamps: false,
    }
  );

  return AuditChange;
};
