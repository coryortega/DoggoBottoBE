const db = require("../database/dbConfig");

module.exports = {
  find,
  findBy,
  add,
  findById,
  remove
};

function find() {
  return db("admins").select("id", "username", "email");
}

function findBy(user) {
  return db("admins")
    .select("id", "username", "password")
    .where(user);
}

function add(user) {
  return db("admins")
    .insert(user, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function findById(id) {
  return db("admins")
    .select("id", "username", "email")
    .where({ id })
    .first();
}

function remove(id) {
  return db("admins")
    .where({ id })
    .del();
}