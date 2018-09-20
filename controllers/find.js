"use strict";
/*查询符合条件的数据*/
module.exports = {
  // 按已知 id查找
  findById: async ctx => {
    console.log("-------findById----------");

    const { Test1 } = ctx.orm(); //获取建立的模型
    const syncId = "1000";
    const rst = await Test1.findById(syncId);
    ctx.res.ok(rst, "success");
  },
  // 按属性查找
  findOne: async ctx => {
    const { Test1 } = ctx.orm();
    const key = "10"; //ctx.params;
    const rst = await Test1.findOne({ where: { key } });
    ctx.res.ok(rst, "success");
  },
  // findAndCountAll - 从数据库中查找多个元素，返回数据与记录总数
  findAndCountAll: async (query, page = {}) => {
    const currentPage = +page.currentPage || 1;
    query.limit = +page.pageSize || 20;
    query.offset = (currentPage - 1) * query.limit;

    const { Test1 } = ctx.orm();
    const rst = await Test1.findAndCountAll(query);
    //返回值包含：
    // count - 整数，匹配到的总记录数
    // rows - 对象数据，通过 limit 和 offset匹配的当前页数据
    const data = {
      list: rst.rows,
      totalCounts: rst.count,
      currentPage
    };
    ctx.res.ok(data, "success");
  },

  // findAll - 从数据库中查找多个元素
  findAll: async ctx => {
    console.log("-------findAll----------");
    const { Test1 } = ctx.orm(); //获取建立的模型

    let data = {};

    //查找所有数据
    data = await Test1.findAll();

    // all是findAll的别名方法:
    Test1.all().then(function(projects) {
      // projects 是一个包含Project实例的数组
    });

    // 查询时使用字符串替换
    data = await Test1.findAll({ where: ["id > ?", 25] }); //各实例的id 大于25

    // 查询指定范围
    data = await Test1.findAll({ where: { id: [1, 2, 3] } });
    // projects 是一个包含 Project 实例的数组，各实例id 是1, 2, 或 3
    // 这在实例执行时，会使用 IN查询

    // 查询指定范围
    data = await Test1.findAll({
      where: {
        id: {
          $and: { a: 5 }, // AND (a = 5)
          $or: [{ a: 5 }, { a: 6 }], // (a = 5 OR a = 6)
          $gt: 6, // id > 6
          $gte: 6, // id >= 6
          $lt: 10, // id < 10
          $lte: 10, // id <= 10
          $ne: 20, // id != 20
          $between: [6, 10], // BETWEEN 6 AND 10
          $notBetween: [11, 15], // NOT BETWEEN 11 AND 15
          $in: [1, 2], // IN [1, 2]
          $notIn: [1, 2], // NOT IN [1, 2]
          $like: "%hat", // LIKE '%hat'
          $notLike: "%hat", // NOT LIKE '%hat'
          $iLike: "%hat", // ILIKE '%hat' (case insensitive)  (PG only)
          $notILike: "%hat", // NOT ILIKE '%hat'  (PG only)
          $overlap: [1, 2], // && [1, 2] (PG array overlap operator)
          $contains: [1, 2], // @> [1, 2] (PG array contains operator)
          $contained: [1, 2], // <@ [1, 2] (PG array contained by operator)
          $any: [2, 3] // ANY ARRAY[2, 3]::INTEGER (PG only)
        },
        status: {
          $not: false // status NOT FALSE
        }
      }
    });

    /**** IN/OR 等复合筛选stat****/
    //way1
    data = await Test1.findOne({
      where: {
        name: "ming",
        $or: [{ id: [1, 2, 3] }, { id: { $gt: 10 } }]
      }
    });

    //way2
    data = await Test1.findOne({
      where: {
        name: "ming",
        id: {
          $or: [[1, 2, 3], { $gt: 10 }]
        }
      }
    });

    //way3 sql语句
    let sql = `SELECT * FROM test_data_table
    WHERE name = 'a project'
    AND (id IN (1,2,3) OR id > 10)    
    LIMIT 1;`;
    data = await sequelize.query(sql, {
      type: sequelize.QueryTypes.SELECT
    });

    /******IN/OR 等复合筛选end********/

    ctx.res.ok(data, "success");
  },

  /******限制返回的数据范围*******/
  retrunValuse: async ctx => {
    const { Test1 } = ctx.orm();
    // 使用 limit 限制返回结果数
    data = await Test1.findAll({ limit: 10 });

    // 跳过前 10 条结果
    data = await Test1.findAll({ offset: 10 });

    // 跳过前 10 条结果后，返回两条数据
    data = await Test1.findAll({ offset: 10, limit: 2 });

    ctx.res.ok(data, "success");
  },

  /******排序分组******/
  orderData: async ctx => {
    const { Test1 } = ctx.orm();
    data = await Test1.findAll({ order: "title DESC" });
    // ORDER BY title DESC

    data = await Test1.findAll({ group: "name" });
    // GROUP BY name

    ctx.res.ok(data, "success");
  },

  pureData: async ctx => {
    const { Test1 } = ctx.orm();
    /*****直返回纯数据*****/
    // 增加 raw 选项后，会返回数据库中的原始结果,不带sequlize实例
    data = await Test1.findAll({ where: {}, raw: true });
  },
  /*****count - 统计数据库中的元素数*****/
  countData: async ctx => {
    const { Test1 } = ctx.orm();
    //way1
    data = await Test1.count({ where: ["id > ? ", 25] });

    //way2
    data = await Test1.count({
      where: {
        id: {
          "&gt": 25
        }
      }
    });
    console.log(`有${data}个id超过25的数据。`);
  },
  operationData: async ctx => {
    const { Test1 } = ctx.orm();
    //最大值
    data = Test1.max("age");
    //查找指定表中最小值
    data = Test1.min("age");

    //对指定属性求和
    //way1
    data = Test1.sum("age", { where: { age: { $gt: 5 } } });
    //way2
    data = Test1.sum("age", { where: ["age > ?", 25] });
  },

  //获取树形信息
  getAreaTreeInfo: async ctx => {
    const { Area } = ctx.orm();
    const { notNull } = ctx.query;
    let query = {};

    if (notNull) {
      query.mapping = { $ne: null };
    }

    let result = [];
    result = [].concat(
      await Area.findAll({
        where: query,
        raw: true //返回纯数据不带sequelize
      })
    );

    let provinces = result.filter(r => r.parent === "1");
    for (let item of provinces) {
      item.citys = result.filter(r => r.parent == item.code);
    }

    ctx.res.ok(provinces, "success");
  },
  batchUpdateHotTrend: async ctx => {
    const { sequelize } = ctx.orm();
    let { topicId, categoryId, langId, list } = ctx.request.body;
    if (
      // 验证参数必填项
      !ctx.res.checkParams(ctx.request.body, [
        "topicId",
        "categoryId",
        "langId",
        "list"
      ])
    ) {
      return;
    }

    //将条件组合成一个临时视图（相当于一个列名为degree和day的表格）
    let tempTable = list
      .map(item => {
        return `
      select '${item.degree}' as degree, '${item.day}' as day
      `;
      })
      .join(" UNION ALL ");
    // select 1和select 2的结果加起来，并且不处理重复项。
    // 比如：select 1返回的是为:1,2,3，select 2返回的值为2,4,5，那么整个这句话返回的值为：1,2,3,2,4,5

    //更新表tbs_dm_bs_out_topic_heat_trend_sec_screen别名a 临时表as b
    //将b的degree批量导入给a表的all_action_count列条件是下面那个
    let sql = `update tbs_dm_bs_out_topic_heat_trend_sec_screen a,(${tempTable}) b
        set a.all_action_count = b.degree 
        WHERE a.type = 'daily_topice_heat_trend_recently'
        AND a.topic_category_id=${categoryId}
        AND a.topic_hash=${topicId}
        AND a.language='${langId}'
        AND a.day= b.day`;
    const result = await sequelize.query(sql); //sequelize执行query语句
    console.log(result);
    ctx.res.ok({}, "success");
  }
};
