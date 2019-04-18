
exports.up = function(knex, Promise) {
  return knex.schema.createTable("likes", table => {
    table.increments();
    // FK to User
    // FK to Question
  })
};

exports.down = function(knex, Promise) {
  
};
