const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routes = require("./routes/quiz.routes");

require("dotenv").config();
const urlDB = process.env.URLDB;

mongoose.connect(urlDB, { useNewUrlParser: true }, (err, db) => {
  if (err) {
    console.log(err);
  }
  app.use("/", routes);
});

app.listen(3000, () => {
  console.log("working at 3000");
});
