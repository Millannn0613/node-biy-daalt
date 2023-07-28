const path = require("path");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "config", "config.env") });
const connectDB = require("./data/mongoose");
const routerCat = require("./router/categotyRouter");
const userRouter = require("./router/userRouter");
app.use(express.json());

app.use("/category", routerCat);
app.use("/user", userRouter);

connectDB();
app.listen(3500);
