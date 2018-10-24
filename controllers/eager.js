module.exports = {
  findInclude: async ctx => {
    const { Task, User, Tool } = ctx.orm();
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

    /**关联查询条件***/
    //使用include.where条件时，include.requied会被隐式的设置为true，即在查询时会使用INNER JOIN内连接。
    // const rst = await User.findAll({
    //   include: [
    //     {
    //       model: Tool,
    //       as: "Instruments",
    //       where: { name: { $like: "%oo%" } }, //name 匹配%a%  "tool1"
    //       paranoid: true // 查询并加载软删除的数据(未删除的记录会返回，否则会返回删除和未删除的全部记录)
    //     }
    //   ]
    // });
    /***全关联***/
    const rst = await User.findAll({ include: [{ all: true }] });
    console.log(JSON.stringify(rst));
  }
};
