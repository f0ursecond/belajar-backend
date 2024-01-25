import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Product = db.define('product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
    imagecuy: {
        type: DataTypes.JSON,
        allowNull: true,
    },
}, {
    freezeTableName: true
});

export default Product;

(async () => {
    await db.sync();
})();