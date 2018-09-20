"use strict";
module.exports = (sequelize, DataTypes) => {
  const Validations = sequelize.define(
    "Validations",
    {
      foo: {
        type: DataTypes.STRING(100),
        comment: "验证建表数据",
        // 这些验证会在模型实例执行create、update和save自动执行
        validate: {
          is: ["^[a-z]+$", "i"], // 只允许字母
          is: /^[a-z]+$/i, // 只允许字母
          not: ["[a-z]", "i"], // 不能使用字母
          isEmail: true, // 检测邮箱格式 (foo@bar.com)
          isUrl: true, // 检查Url格式 (http://foo.com)
          isIP: true, // 检查 IPv4 或 IPv6 格式
          isIPv4: true, // 检查 IPv4
          isIPv6: true, // 检查 IPv6
          isAlpha: true, // 不能使用字母
          isAlphanumeric: true, // 只允许字母数字字符
          isNumeric: true, // 只能使用数字
          isInt: true, // 只能是整数
          isFloat: true, // 只能是浮点数
          isDecimal: true, // 检查数字
          isLowercase: true, // 检查小写字母
          isUppercase: true, // 检查大写字母
          notNull: true, // 不允许null
          isNull: true, // 只能为null
          notEmpty: true, // 不能空字符串
          equals: "specific value", // 只能使用指定值
          contains: "foo", // 必须包含子字符串
          notIn: [["foo", "bar"]], // 不能是数组中的任意一个值
          isIn: [["foo", "bar"]], // 只能是数组中的任意一个值
          notContains: "bar", // 不能包含子字符串
          len: [2, 10], // 值的长度必在 2 和 10 之间
          isUUID: 4, // 只能是UUID
          isDate: true, // 只能是日期字符串
          isAfter: "2011-11-05", // 只能使用指定日期之后的时间
          isBefore: "2011-11-05", // 只能使用指定日期之前的时间
          max: 23, // 允许的最大值
          min: 23, // 允许的最小值
          isArray: true, // 不能使用数组
          isCreditCard: true, // 检查是有效的信用卡

          // 也可以自定义验证:
          isEven: function(value) {
            if (parseInt(value) % 2 != 0) {
              throw new Error("Only even values are allowed!");
              // we also are in the model's context here, so this.otherField
              // would get the value of otherField if it existed
            }
          }
        }
      },
      name: { type: DataTypes.STRING(100), comment: "名称" },
      gender: { type: DataTypes.STRING(100), comment: "性别" },
      parent: { type: DataTypes.STRING(100), comment: "父级地市编码" },
      mapping: { type: DataTypes.STRING(100), comment: "映射gis区域名称" }
    },
    {
      tableName: "validation", //test
      underscore: true //转换列名的驼峰命名规则为下划线命令规则
    }
  );
  Validations.sync(); //同步模型到数据库
  return Validations;
};
