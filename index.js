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
app.use(ProductRoute);
app.use(UserRoute);


app.get('/', (req, res) => {
    res.send('Hello, this is the root path!');
});

app.get('/api', (req, res) => {
    res.send('Hello, this /api!');
});

app.listen(5000, () => console.log("Server Up and Running..."));
