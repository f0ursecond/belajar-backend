import express from "express";
import FileUpload from "express-fileupload";
import cors from "cors";
import ProductRoute from "./routes/ProductRoute.js";
import UserRoute from "./routes/UserRoute.js";
import config from "./config.js";


const app = express();

app.use(cors());
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    next();
});


console.log(`NODE_ENV:${config.NODE_ENV}`)
console.log(`DB NAME:${config.DB_NAME}`)


app.get('/', (req, res) => {
    res.send(`Hello, this is the root path!, YOURE ON ${config.DB_USERNAME}`);
});

app.get('/api', (req, res) => {
    res.send(`Hello, YOURE ON ${config.DB_USERNAME},NODE_ENV:${config.NODE_ENV}`);
});


app.use(ProductRoute);
app.use(UserRoute);

app.listen(5000, () => console.log("Server Up and Running..."));
