"use strict";
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    "Project",
    {
      name: { type: DataTypes.STRING(100) }
    },
    {
      tableName: "t_project",
      underscore: true //下划线开启
    }
  );

  // Project.associate = function(modules) {
  //   this.hasMany(modules.Task, { foreignKey: "user_id" }); //, as: "task"
  //   this.hasMany(modules.Tool, { as: "Instruments", foreignKey: "user_id" }); //别名
  // };
  Project.sync(); //{ force: true }
  return Project;
};
