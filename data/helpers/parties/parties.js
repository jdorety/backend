const db = require("../../dbConfig.js");

module.exports = {
  add,
  get,
  getList,
  edit,
  remove
};
//adds party record to parties table, w/ user_id of posting user
function add(user_id, party) {
  return db("parties").insert({ ...party, user_id });
}
//get party object w/ matching id
function get(id) {
  return db("parties")
    .select(
      "parties.id",
      "users.username",
      "when",
      "theme",
      "numberGuest",
      "budget",
      "spentBudget"
    )
    .where({ 'parties.id': id })
    .innerJoin("users", "parties.user_id", "users.id")
    .first();
}
//returns array of party objects associated with the passed user_id
function getList(user_id) {
  return db("parties")
    .select("id", "when", "theme", "numberGuest", "budget", "spentBudget")
    .where({ user_id });
}
//edit party record of matching id w/ changes passed as object
function edit(id, party) {
  return db("parties")
    .where({ id })
    .update({ ...party });
}
//remove party record of matching id
function remove(id) {
  return db("parties")
    .where({ id })
    .del();
}
