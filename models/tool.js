"use strict";
module.exports = (sequelize, DataTypes) => {
  const Tool = sequelize.define(
    "Tool",
    {
      name: { type: DataTypes.STRING(100) },
      userId: { type: DataTypes.TINYINT, field: "user_id" } //方便关联
    },
    {
      tableName: "t_tool",
      underscore: true //下划线开启
    }
  );
  //Task.belongsTo(User);{ force: true }
  Tool.sync();

  return Tool;
};
