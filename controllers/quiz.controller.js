const Quiz = require("../models/quiz.model");

module.exports = {
  createQuiz: async (req, res) => {
    console.log(req.body);
    let q = new Quiz(req.body);
    q.save()
      .then((saved) => {
        // res.send("tis done id sent back");
        res.send(saved.uId);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  },
  getQuizzes: async (req, res) => {
    Quiz.find({}, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: err });
      }
      res.send(results);
    });
  },
  getQuiz: async (req, res) => {
    Quiz.findOne({ uId: req.params.quizid }, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: err });
      }
      res.send(results);
    });
  },
  updateScore: async (req, res) => {
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
  },
  deleteQuiz: async (req, res) => {
    Quiz.deleteOne({ uId: req.params.quizid }, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: err });
      }
      if (!results) {
        res.status(404).send("not found");
      }
    });
    res.json({ message: "deleted the document" });
  },
  getScores: async (req, res) => {
    Quiz.findOne({ uId: req.params.quizid }, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: err });
      }
      if (!results.scores) {
        res.send("no scores found");
      }
      res.send(results.scores);
    });
  },
};
