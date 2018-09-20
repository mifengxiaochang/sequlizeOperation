module.exports = {
  findInclude: async ctx => {
    const { Task, User } = ctx.orm();
    /*******同时加载关联的数据*****/
    //way1
    //  const rst = await User.findAll({ include: [{ model: Task }] });
    //way2
    //const rst = await User.findAll({ include: [Task] }); //查询联通task数据

    // console.log(rst);

    /*******使用as选项为关系数据指定别名*****/
    // const rst = await User.findAll({
    //   include: [{ model: Task, as: "task" }] //定义model用别名查询必须有as
    // });
    console.log(JSON.stringify(rst));
  }
};
