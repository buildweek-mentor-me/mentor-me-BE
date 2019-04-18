exports.up = function(knex, Promise) {
  return knex.schema.table("questions", questions => {
    questions.string("image_url");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("questions", questions => {
    questions.dropColumn("image_url");
  });
};
