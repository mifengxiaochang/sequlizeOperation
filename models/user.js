"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: { type: DataTypes.STRING(100) },
      gender: { type: DataTypes.STRING(10) },
      age: { type: DataTypes.TINYINT }
    },
    {
      tableName: "t_user",
      underscore: true //下划线开启
    }
  );

  User.associate = function(modules) {
    this.hasMany(modules.Task, { foreignKey: "user_id" }); //, as: "task"
    this.hasMany(modules.Tool, { as: "Instruments" }); //别名
  };
  User.sync(); //{ force: true }
  return User;
};
