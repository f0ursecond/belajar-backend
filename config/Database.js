import { Sequelize } from "sequelize";

const db = new Sequelize("bztr2yjwsf0kmrba7sqo", "u4ufwid7qzszwz7z", "n31GOHQ2j5FobAZyLvkU", {
  host: "bztr2yjwsf0kmrba7sqo-mysql.services.clever-cloud.com",
  dialect: "mysql",
});

export default db;
