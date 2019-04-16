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

    return db("answers").then(answers => {
      return answers.map(answer => mappers.ToBody(answer));
    });
  },
  insert: function(answer) {
    return db("answers")
      .insert(answer)
      .returning("id")
      .then(([id]) => this.get(id));
  }
};
