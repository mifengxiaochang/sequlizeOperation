"use strict";
module.exports = (sequelize, DataTypes) => {
  //define定义一个Model
  const Config = sequelize.define(
    "Config",
    {
      code: { type: DataTypes.STRING(100), comment: "编码" },
      name: { type: DataTypes.STRING(100), comment: "名称" },
      gender: { type: DataTypes.STRING(100), comment: "性别" },
      parent: { type: DataTypes.STRING(100), comment: "父级地市编码" },
      mapping: { type: DataTypes.STRING(100), comment: "映射gis区域名称" }
    },
    //配置
    {
      underscore: true, //转换列名的驼峰命名规则为下划线命令规则
      // 不要添加时间戳属性 (updatedAt, createdAt)
      timestamps: false,

      // 不从数据库中删除数据，而只是增加一个 deletedAt 标识当前时间
      // paranoid 属性只在启用 timestamps 时适用
      paranoid: true,

      // 不使用驼峰式命令规则，这样会在使用下划线分隔
      // 这样 updatedAt 的字段名会是 updated_at
      underscored: true,

      // 禁止修改表名. 默认情况下
      // sequelize会自动使用传入的模型名（define的第一个参数）做为表名
      // 如果你不想使用这种方式你需要进行以下设置
      freezeTableName: true,

      // 定义表名
      tableName: "Config_table"

      /********单独列处理时间戳**********/
    }
  );
  Config.sync(); //同步模型到数据库

  // // 强制创建
  // Model.sync()只会同步当前模型到数据库中，而sequelize.sync()会同步sequelize实例中定义所有模型。
  // // 通过设置 force 属性会首先删除表并重新创建
  // Config.sync({ force: true });

  // // 删除表
  // Config.drop();
  return Config;
};
