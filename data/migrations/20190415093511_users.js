exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", users => {
    users.increments();
    users
      .string("handle", 128)
      .notNullable()
      .unique();
    users
      .string("email", 128)
      .notNullable()
      .unique();
    users.string("password", 128).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
