const db = require("../../data/dbConfig.js");
const mappers = require("../mapper");

module.exports = {
  get: function(id) {
    let questionQuery = db("questions as q");

    if (id) {
      questionQuery.where({ "q.id": id }).first();

      const promises = [questionQuery, this.getQuestionAnswers(id)];

      return Promise.all(promises).then(results => {
        let [question, answers] = results;
        question.answers = answers;

        return mappers.questionToBody(question);
      });
    }

    return questionQuery.then(questions => {
      return questions.map(question => mappers.questionToBody(question));
    });
  },
  getQuestionAnswers: function(questionId) {
    return db("answers")
      .where({ FK_question_id: questionId })
      .then(answers => answers.map(answer => mappers.ToBody(answer)));
  },
  // get: function(id) {
  //   if (id) {
  //     return db("questions")
  //       .where({ id })
  //       .first()
  //       .then(question => mappers.questionToBody(question));
  //   }

  //   return db("questions").then(questions => {
  //     return questions.map(question => mappers.questionToBody(question));
  //   });
  // },
  insert: function(question) {
    return db("questions")
      .insert(question)
      .returning("id")
      .then(([id]) => this.get(id));
  }
};
