import { Sequelize } from "sequelize";
import mysql2 from "mysql2";
import config from "../config.js";

const db = new Sequelize(config.DB_NAME, config.DB_USERNAME, config.DB_PASSWORD, {
  host: config.DB_HOST,
  dialect: "mysql",
  dialectModule: mysql2,
  logging: config.NODE_ENV === 'development' ? true : false,
  dialectOptions: {
    connectTimeout: 80000,
    requestTimeout: 80000,
  },
});


db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.log('Unable to connect to the database:', err);
  });

export default db;
