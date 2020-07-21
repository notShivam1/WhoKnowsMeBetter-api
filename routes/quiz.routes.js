let router = new require("express").Router();
const {
  createQuiz,
  getQuizzes,
  getQuiz,
  updateScore,
  deleteQuiz,
  getScores,
} = require("../controllers/quiz.controller");

router.post("/", createQuiz);
router.get("/", getQuizzes);
router.get("/:quizid", getQuiz);
router.put("/:quizid", updateScore);
router.delete("/:quizid", deleteQuiz);
router.get("/:quizid/scores", getScores);

module.exports = router;
