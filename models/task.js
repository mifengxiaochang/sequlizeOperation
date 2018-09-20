"use strict";
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "Task",
    {
      name: { type: DataTypes.STRING(100) },
      userId: { type: DataTypes.TINYINT, field: "user_id" } //方便关联
    },
    {
      tableName: "t_task",
      underscore: true //下划线开启
    }
  );
  Task.associate = function(modules) {
    this.belongsTo(modules.User);
  };
  Task.sync(); //{ force: true }// 首先删除表并重新创建
  return Task;
};
