const Koa = require("koa");
const Router = require("koa-router");

const orm = require("koa-orm")(config.database);
const config = require("./config");
const test1Controller = require("./controllers/test1");

console.log(config.database);

const app = new Koa();

app.use(orm.middleware);

const router = new Router();
router.get("/", test1Controller.welcome);

app.listen(4321, () => {
  console.log("starting at port 4321");
});
