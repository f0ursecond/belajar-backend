import { Sequelize } from "sequelize";
import mysql2 from "mysql2";
import config from "../config.js";

const db = new Sequelize(config.DB_NAME, config.DB_USERNAME, config.DB_PASSWORD, {
  host: config.DB_HOST,
  dialect: "mysql",
  dialectModule: mysql2,
  logging: config.NODE_ENV === 'development' ? true : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectOptions: {
    connectTimeout: 30000,
    requestTimeout: 30000,
  },
});

export default db;
