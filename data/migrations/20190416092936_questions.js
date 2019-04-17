exports.up = function(knex, Promise) {
  return knex.schema.createTable("questions", questions => {
    questions.increments();
    questions.string("title", 128).notNullable();
    questions.string("body", 128).notNullable();
    questions
      .datetime("created_at")
      .defaultTo(Date.now());
    questions.string("author").notNullable();
    questions.integer("likes");
    questions
      .integer("FK_user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("questions");
};
