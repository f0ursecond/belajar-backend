import { Sequelize } from "sequelize";

const db = new Sequelize("crudtest", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
