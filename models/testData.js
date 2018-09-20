"use strict";
module.exports = (sequelize, DataTypes) => {
  const Test = sequelize.define(
    "Test",
    {
      code: { type: DataTypes.STRING(100) },
      name: { type: DataTypes.STRING(100) },
      gender: { type: DataTypes.STRING(10) },
      age: { type: DAtaTypes.TINYINT }
    },
    {
      tableName: "test_data_table",
      underscore: true //下划线开启
    }
  );
  Test.sync();
  return Test;
};
