exports.up = function(knex, Promise) {
  return knex.schema.createTable("answers", answers => {
    answers.increments();
    answers.string("body", 128).notNullable();
    answers.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now(6));
    answers.string("author").notNullable();
    answers.integer("likes");
    answers
      .integer("FK_question_id")
      .unsigned()
      .references("id")
      .inTable("questions")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    answers
      .integer("FK_user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("answers");
};
