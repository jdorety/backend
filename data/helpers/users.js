const db = require("../dbConfig.js");

module.exports = {
  registerUser,
  getUser
};

async function registerUser({ username, password }) {
  await db("users").insert({ username, password });
  return db("users")
    .select("username", "id")
    .where({ username })
    .first();
}

function getUser({ id }) {
  return db("users")
    .select("username", "password")
    .where({ id })
    .first();
}
