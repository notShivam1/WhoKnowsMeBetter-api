const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routes = require("./routes/quiz.routes");
const bodyParser = require("body-parser");
require("dotenv").config();
const urlDB = process.env.URLDB;
app.use(bodyParser.json());

mongoose.connect(urlDB, { useNewUrlParser: true }, (err, db) => {
  if (err) {
    console.log(err);
  }
  console.log("DB connected succesfully.")
});
app.use("/quizzes", routes);

app.listen(3000, () => {
  console.log("working at 3000");
});
