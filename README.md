# sequelizerc 常用 API

- 安装

- npm init

- 新建 index.js 文件搭建 Koa

- 配置数据库

```
const orm = require("koa-orm")(config.database);
app.use(orm.middleware);
```

- 在配置的相关 models 文件中编写建立模

  [相关数据类型链接](https://itbilu.com/nodejs/npm/V1PExztfb.html#definition-dataType)

- 建立路由编写 controller
