const mongoose = require("mongoose");
const shortid = require("shortid");

const QuizSchema = new mongoose.Schema({
  uId: {type : String, default:shortid.generate()},
  createdAt: {type : String, default:Date.now()} ,
  scores:{type:  [
    {
      name: String,
      scoreCount: Number
    }
  ], default:[]},
  questions: [
    {
      questionText: { type: String, minlength: 10, maxlength: 300 },
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
