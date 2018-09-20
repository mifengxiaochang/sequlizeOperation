module.exports = {
  bulkCreate: async ctx => {
    console.log("bulk start");
    const { Task, User } = ctx.orm(); //获取建立的模型
    // const rst = await
    // Task.bulkCreate([
    //   { id: 1, name: "JD", userId: 1 },
    //   { id: 2, name: "TM", userId: 2 },
    //   { id: 3, name: "TB", userId: 1 },
    //   { id: 4, name: "XP", userId: 1 },
    //   { id: 5, name: "hj", userId: 1 }
    // ]);
    // 如果主键重复可能添加数据失败，在sync中写sync({force:true})覆盖数据
    User.bulkCreate([
      { name: "23", gender: "male", age: 23, id: 1 },
      { name: "efer", gender: "female", age: 26, id: 2 }
    ]);
    // console.log(rst); //sequlize 实例
    // console.log(JSON.stringify(rst));//数据
    console.log("-----bulk finish-----");
  }
};
