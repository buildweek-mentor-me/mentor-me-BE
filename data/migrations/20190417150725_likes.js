exports.up = function(knex, Promise) {
  return knex.schema.createTable("likes", column => {
    column.increments();
    column
      .integer("FK_user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    column
      .integer("FK_question_id")
      .unsigned()
      .references("id")
      .inTable("questions")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("likes");
};
