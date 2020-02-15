const chai = require("chai");
const chaiHttp = require("chai-http");
const Quiz = require("../models/quiz.model");
const app = require("../server");

chai.use(chaiHttp);
chai.should();

const expect = chai.expect;
describe("quizzes", () => {
  describe("/ get", function()  {
    this.timeout(10000); 

    it("shows all docs", done => {
      chai
        .request(app)
        .get("/quizzes")
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
  }),
    describe("/ post", () => {
      it("stores a doc in db", done => {
        chai
          .request(app)
          .post("/quizzes")
          .send({
            questions: [
              {
                questionText: "what is my name?",
                qId: "quest1",
                rightoption: "opt1",
                options: [
                  {
                    oid: "opt1",
                    optionText: "shivam"
                  },
                  {
                    oid: "opt2",
                    optionText: "shivam"
                  },
                  {
                    oid: "opt3",
                    optionText: "shavam"
                  },
                  {
                    oid: "opt4",
                    optionText: "shuvam"
                  }
                ]
              }
            ]
          })
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            done();
          });
      });
    });
});

describe("quizid", () => {
  describe("/ get", () => {
    it("shows matching quizid", done => {
      chai
        .request(app)
        .get("/quizzes/:quizid")
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
  }),
    describe("/ put", () => {
      it("updates the scores", done => {
        chai
          .request(app)
          .put("/quizzes/:quizid")
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            done();
          });
      });
    }),
    describe("/delete", () => {
      it("deletes the quiz", done => {
        Quiz.findOne({}, (err, result) => {
          chai
            .request(app)
            .delete(`/quizzes/${result.uId}`)
            .end((err, res) => {
              console.log(res.body);
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              expect(res.body.message).to.be.equal("deleted the document");
              done();
            });
        });
      });
    });
});

describe("scores", () => {
  describe("/ get", function() {
    this.timeout(10000); 

    it("gets all scores on the score page",  done => {
      Quiz.findOne({}, (err, result) => {
        chai
          .request(app)
          .get(`/quizzes/${result.uId}/scores`)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            done();
          });
      });
    });
  });
});
