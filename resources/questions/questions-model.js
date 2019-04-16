const db = require("../../data/dbConfig.js");
const mappers = require("../mapper");

module.exports = {
  get: function(id) {
    if (id) {
      return db("questions")
        .where({ id })
        .first()
        .then(question => mappers.questionToBody(question));
    }

    return db("questions").then(questions => {
      return questions.map(question => mappers.questionToBody(question));
    });
  },
  insert: function(question) {
    return db("questions")
      .insert(question)
      .returning("id")
      .then(([id]) => this.get(id));
  }
};
