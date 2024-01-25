import { Sequelize } from "sequelize";

const db = new Sequelize('testcrud', 'root', '', {
    host: 'localhost',
    dialect: "mysql"
});

export default db;