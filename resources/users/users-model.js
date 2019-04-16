const db = require("../../data/dbConfig");

module.exports = {
  insert,
  update,
  remove,
  getAll,
  findBy,
  findById
};

async function insert(user) {
  const [id] = await db("users").insert(user).returning('id');
  return db("users")
    .where({ id })
    .first();
}

async function update(id, changes) {
  await db("users")
    .where({ id })
    .update(changes);
  return db("users").where({ id });
}

async function remove(id) {
  await db("users")
    .where({ id })
    .del();
}

async function getAll() {
  return await db("users").select("users.id", "users.handle")
}

function findBy(filter) {
  return db("users").where(filter);
}

async function findById(id) {
  return await db("users")
    .where({ id })
    .first();
}
