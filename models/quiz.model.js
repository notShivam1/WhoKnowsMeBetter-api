const mongoose = require("mongoose");
const shortid = require("shortid");

const QuizSchema = new mongoose.Schema({
  uId: { type: String, default: shortid.generate() },
  createdAt: { type: String, default: Date.now() },
  scores: {
    type: [
      {
        name: String,
        scoreCount: Number
      }
    ],
    default: []
  },
  questions: [
    {
      questionText: { type: String, minlength: 10, maxlength: 300 },
      qId: String,
      rightOption: String,
      options: {
        type: [
          {
            oId: String,
            optionText: { type: String, minlength: 4, maxlength: 100 }
          }
        ],
        validate: function(val) {
          return val.length <= 4 && val.length >= 2;
        }
      }
    }
  ]
});

QuizSchema.pre("validate", function(next) {
  //console.log(this);
  for (let i = 0; i < this.questions.length; i++) {
    for (let j = 0; j < this.questions[i].options.length; j++) {
      if (this.questions[i].rightOption == this.questions[i].options[j].oId) {
        return next();
      }
    }
  }
  return next(
    new Error("Right option doesnt match any of the present options")
  );
});

let Quiz = mongoose.model("Quiz", QuizSchema);

module.exports = Quiz;
