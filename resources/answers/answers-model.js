const db = require("../../data/dbConfig.js");
const mappers = require("../mapper");

module.exports = {
  get: function(id) {
    if (id) {
      return db("answers")
        .where({ id })
        .first()
        .then(answer => mappers.ToBody(answer));
    }

    return db("questions").then(questions => {
      return questions.map(question => mappers.ToBody(question));
    });
  },
  insert: function(question) {
    return db("questions")
      .insert(question)
      .returning("id")
      .then(([id]) => this.get(id));
  }
};
