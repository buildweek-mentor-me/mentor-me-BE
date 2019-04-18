exports.up = function(knex, Promise) {
  return knex.schema.table("users", users => {
    users.string("business_field");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("users", users => {
    users.dropColumn("business_field");
  });
};
