import dotenv from "dotenv";
dotenv.config();
import path from "path"
import { fileURLToPath } from "url";

const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName)

dotenv.config({
    path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
})

const config = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    DB_NAME: process.env.DB_NAME || 'crudtest',
    DB_USERNAME: process.env.DB_USERNAME || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    DB_HOST: process.env.DB_HOST || 'localhost',
}

export default config;