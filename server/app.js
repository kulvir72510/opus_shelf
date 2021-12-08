const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
require("./db/conn"); // using Database function from conn.js (for not using that code repeditly)
const app = express();
const DB = process.env.DATABASE;
app.use(express.json());
app.use(require("./router/auth")); //link router files for making router easy
const User = require("./model/userSchema");
const PATH = process.env.PORT;

// app.get("/", (req, res) => {
//   res.send("<h1>Hello from server (Home)<h1>");
// });

app.listen(PATH, () => {
  console.log("Server Running");
});
