const express = require("express");
const app = express();
const Quiz = require("../models/quiz.model");
const bodyParser = require("body-parser");
const shortid = require("shortid");

app.use(bodyParser.json());

app.get("/", (req, res) => { // LANDING PAGE
  res.write("API Ok.");
});

app.post("/createQuiz", (req, res) => { // CREATION OF QUIZ AND STORED IN DB
  console.log(req.body);
  let q = new Quiz(req.body);
  q.save(err => {
    let IdForQuiz = shortid.generate();
    console.log(IdForQuiz);
    res.send(IdForQuiz);  // A SHORTID FOR QUI IS SENT BACK
  });
});

app.get("/quizzes", (req, res) => { // ALL DOCUMENTS ARE SHOWN HERE
  Quiz.find({}, (err, results) => {
    if (err) {
      console.log(err);
    }
    console.log(results);
    res.send(results);
  });
});

app.get("/quizzes/:quizid", (req, res) => { // QUIZ IS SHOWN THROUGH A SHORTID OF IT
  Quiz.findOne({ uId: req.params.quizid }, (err, results) => {
    if (err) {
      console.log(err);
    }
    console.log(results);
    res.send(results);
  });
});

app.put("/quizzes/:quizid", (req, res) => { // TO UPDATE THE SCORES WHEN THE QUIZ IS TAKEN
  console.log(req.body);
  Quiz.updateOne(
    { uId: req.params.quizid },
    { $push: { scores: req.body } },
    (err, results) => {
      if (err) {
        console.log(err);
      }
      res.send("updated the scores");
    }
  );
});

app.get("/quizzes/:quizid/:scores", (req, res) => { // TO GET ALL THE SCORES ON THE SCORES PAGE
  Quiz.findOne({ uId: req.params.quizid }, (err, results) => {
    if (err) {
      console.log(err);
    }
    console.log(results.scores);
    res.send(results.scores);
  });
});

app.delete("/quizzes/:quizid", (req, res) => {  // TO DELETE A QUIZ
  Quiz.deleteOne({ uId: req.params.quizid }, (err, results) => {
    if (err) {
      console.log(err);
    }
    res.send("deleted the document");
  });
});

module.exports = app;
