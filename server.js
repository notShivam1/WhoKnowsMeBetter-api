const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routes = require("./routes/quiz.routes");
const bodyParser = require("body-parser");
require("dotenv").config();
const urlDB = process.env.URLDB;
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());

mongoose.connect(urlDB, { useNewUrlParser: true }, (err, db) => {
  if (err) {
    console.log(err);
  }
  console.log("DB connected succesfully.");
});
app.get("/", (req, res) => {
  res.send("api working");
});

app.use("/quizzes", routes);

app.listen(PORT, () => {
  console.log(`working at ${PORT}`);
});

app.use((err, req, res, next) => {
  if (req.xhr) {
    res.status(500).send({ error: "Something failed!" });
  } else {
    next(err);
  }
});

module.exports = app;
