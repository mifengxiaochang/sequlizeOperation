database = {
  dialect: "mysql",
  username: "admin",
  password: "admin",
  database: "demo_node",
  host: "127.0.0.1",
  define: {
    timestamps: false,
    underscored: true,
    underscoredAll: true,
    charset: "utf8",
    dialectOptions: {
      collate: "utf8_general_ci"
    }
  },
  dialectOptions: {
    chartset: "utf8mb4"
  },
  modelPath: path.join(__dirname, "../models/"), //返回 models  ,__dirname表示当前运行环境绝对路径
  pool: {
    // mysql连接池
    max: 5,
    idle: 30000,
    acquire: 60000
  }
};
Object.assign(configs, database);
module.exports = configs;
