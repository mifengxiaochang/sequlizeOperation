const Koa = require("koa");
const Router = require("koa-router");

const config = require("./config");
const orm = require("koa-orm")(config.database);
const eagerController = require("./controllers/eager");
const addController = require("./controllers/add");

const app = new Koa();
const router = new Router();
router.get("/", eagerController.findInclude);
router.get("/add", addController.bulkCreate);

app.use(orm.middleware);
app.use(router.routes());
app.listen(5678, () => {
  console.log("starting at port 5678");
});
