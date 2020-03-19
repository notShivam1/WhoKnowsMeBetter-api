const express = require("express");
const Quiz = require("../models/quiz.model");
let router = new express.Router();

router
  .route("/")
  .post((req, res) => {
    // CREATION OF QUIZ AND STORED IN DB
    console.log(req.body);
    let q = new Quiz(req.body);
    q.save()
      .then(saved => {
        // res.send("tis done id sent back");
        res.send(saved.uId);
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
      res.send(results);
    });
  })
  .put((req, res) => {
    // TO UPDATE THE SCORES WHEN THE QUIZ IS TAKEN
    Quiz.updateOne(
      { uId: req.params.quizid },
      { $push: { scores: req.body } },
      (err, results) => {
        if (err) {
          res.status(500).json({ error: err });
        }
        res.send("updated the scores");
      }
    );
  })
  .delete((req, res) => {
    //TO DELETE A QUIZ
    Quiz.deleteOne({ uId: req.params.quizid }, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: err });
      };
      if(!results){
        res.status(404).send("not found");
      };
    });
    res.json({message:"deleted the document"});

  });

router.get("/:quizid/scores", (req, res) => {
  // TO GET ALL THE SCORES ON THE SCORES PAGE
  Quiz.findOne({ uId: req.params.quizid }, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
    if(!results.scores){
      res.send("no scores found");
    }
    res.send(results.scores);
  });
});

module.exports = router;
