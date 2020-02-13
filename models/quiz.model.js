const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  uId: String,
  createdAt: Date,
  scores: [
    {
      name: String,
      scoreCount: Number
    }
  ],
  questions: [
    {
      questionText: { type: String, minlength: 10, maxlength: 60 },
      qId: String,
      rightOption: String,
      options: {
        type: [
          {
            oid: String,
            optionText: String
          }
        ],
        validate: function(val) {
          return val.length <= 4 && val.length >= 2;
        }
      }
    }
  ]
});

let Quiz = mongoose.model("Quiz", QuizSchema);

module.exports = Quiz;
