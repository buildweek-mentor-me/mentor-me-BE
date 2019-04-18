exports.up = function(knex, Promise) {
  return knex.schema.table("questions", questions => {
    questions.string("business_field", 128);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("questions", questions => {
    questions.dropColumn("business_field");
  });
};
