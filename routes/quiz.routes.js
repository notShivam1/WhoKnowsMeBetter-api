const express = require("express");
const app = express();
const Quiz = require("../models/quiz.model");
let router = new express.Router();

// app.get("/", (req, res) => { // LANDING PAGE
//   res.write("API Ok.");
// });

router
  .route("/")
  .post((req, res) => {
    // CREATION OF QUIZ AND STORED IN DB
   // console.log(req.body);
    let q = new Quiz(req.body);
    q.save()
      .then(saved => {
        console.log(saved.uId);
        res.send("tis done id sent back");
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  })
  .get((req, res) => {
    // ALL DOCUMENTS ARE SHOWN HERE
    Quiz.find({}, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: err });
      }
      console.log(results);
      res.send(results);
    });
  });

router
  .route("/:quizid")
  .get((req, res) => {
    // QUIZ IS SHOWN THROUGH A SHORTID OF IT
    Quiz.findOne({ uId: req.params.quizid }, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: err });
      }
      console.log(results);
      res.send(results);
    });
  })
  .put((req, res) => {
    // TO UPDATE THE SCORES WHEN THE QUIZ IS TAKEN
    console.log(req.body);
    Quiz.updateOne(
      { uId: req.params.quizid },
      { $push: { scores: req.body } },
      (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).json({ error: err });
        }
        res.send("updated the scores");
      }
    );
  })
  .delete((req, res) => {
    // TO DELETE A QUIZ
    Quiz.deleteOne({ uId: req.params.quizid }, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: err });
      }
      res.send("deleted the document");
    });
  });

router.get("/:quizid/:scores", (req, res) => {
  // TO GET ALL THE SCORES ON THE SCORES PAGE
  Quiz.findOne({ uId: req.params.quizid }, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
    console.log(results.scores);
    res.send(results.scores);
  });
});

module.exports = router;
