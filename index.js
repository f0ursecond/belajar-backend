import express from "express";
import FileUpload from "express-fileupload";
import cors from "cors";
import ProductRoute from "./routes/ProductRoute.js";
import UserRoute from "./routes/UserRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    next();
});


// console.log(`NODE_ENV:${config.NODE_ENV}`)
// console.log(`DB NAME:${config.DB_NAME}`)
// console.log(`PUBLIC KEY:${config.KEYUPLOAD}`)

app.get('/', (req, res) => {
    res.send(`Hello, World`);
});

app.get('/api', (req, res) => {
    res.send(`Hello, This API Made With Alif Zulfanur & 80% CHATGPT`);
});

app.use(ProductRoute);
app.use(UserRoute);

app.listen(8000, () => console.log("Server Up and Running..."));
