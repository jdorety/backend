const db = require("../dbConfig.js");

module.exports = {
  registerUser
};

async function registerUser({ username, password }) {
  await db("users").insert({ username, password });
  return db("users").where({ username }).first();
}
