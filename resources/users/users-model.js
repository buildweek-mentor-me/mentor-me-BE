const db = require("../../data/dbConfig.js");
const mappers = require("../mapper");

module.exports = {
  get: function(id) {
    let usersQuery = db("users as u");

    if (id) {
      usersQuery.where({ "u.id": id }).first();

      const promises = [usersQuery, this.getUserQuestions(id)];

      return Promise.all(promises).then(results => {
        let [user, questions] = results;
        user.questions = questions;

        return mappers.userToBody(user);
      });
    }

    return db.from("users as u").select("u.id", "u.handle", "u.profile_pic_url").then(users => {
      return users.map(user => mappers.userToBody(user));
    });
  },
  getUserQuestions: function(userId) {
    return db("questions")
      .where({ FK_user_id: userId })
      .then(questions => questions.map(question => mappers.ToBody(question)));
  },
  insert: function(user) {
    return db("users")
      .insert(user)
      .returning("id")
      .then(([id]) => this.get(id));
  },
  findBy: function(filter) {
    return db("users").where(filter);
  },
  update: function(id, change) {
    return db("users")
      .where({ id: id })
      .update(change)
      .then(count => (count > 0 ? this.get(id) : null));
  },
  remove: function(id) {
    return db("users")
      .where({ id: id })
      .del();
  },
  updatePassword: function(id, password) {
    return db("users")
      .where({ id })
      .update({ password });
  }
};

