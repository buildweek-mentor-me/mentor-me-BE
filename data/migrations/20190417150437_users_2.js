exports.up = function(knex, Promise) {
  return knex.schema.table("users", users => {
    users.string("profile_pic_url");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("users", users => {
    users.dropColumn("profile_pic_url");
  });
};
