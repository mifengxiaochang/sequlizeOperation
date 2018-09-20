"use strict";
module.exports = (sequelize, DataTypes) => {
  const Tool = sequelize.define(
    "Tool",
    {
      name: { type: DataTypes.STRING(100) },
    },
    {
      tableName: "t_tool",
      underscore: true //下划线开启
    }
  );
  //Task.belongsTo(User);
  Tool.sync();
  return Tool;
};
