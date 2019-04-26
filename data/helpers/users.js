const db = require("../dbConfig.js");

module.exports = {
  registerUser
};

function registerUser({ username, password }) {
  return db("users").insert({ username, password });
}
