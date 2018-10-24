"use strict";
// 如果想为连接表添加更多属性，可以建立关联前在sequelize 中为连接表定义一个模型，这会告诉sequelize 使用这个表建立关联而不是创建新表：
module.exports = (sequelize, DataTypes) => {
  //User和Project关系模型
  const UserProjects = sequelize.define(
    "UserProjects",
    {
      status: DataTypes.STRING
    },
    {
      tableName: "t_user_project",
      underscore: true
    }
  );
  UserProjects.sync();
  return UserProjects;
};
