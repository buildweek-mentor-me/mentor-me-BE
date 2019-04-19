exports.up = knex => {
  return knex.schema.alterTable("questions", table => {
    table
      .integer("likes")
      .defaultTo(1)
      .alter();
  });
};

exports.down = knex => {
  return knex.schema.alterTable("questions", table => {
    table
      .integer("likes")
      .defaultTo(1)
      .alter();
  });
};
