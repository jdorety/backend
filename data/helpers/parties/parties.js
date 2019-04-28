const db = require("../../dbConfig.js");

module.exports = {
  add,
  get,
  edit,
  remove
};
//adds party record to parties table, w/ user_id of posting user
function add(user_id, party) {
  return db("parties").insert({ ...party, user_id });
}
//returns array of party objects associated with the passed user_id
function get(user_id) {
<<<<<<< HEAD
  return db("parties")
    .select(
      "parties.id",
      "username",
      "when",
      "theme",
      "numberGuest",
      "budget",
      "spentBudget"
    )
    .where({ user_id })
    .innerJoin("users", "user_id", "users.id");
=======
  return db('parties').select('parties.id', 'username', 'when', 'theme', 'numberGuest', 'budget', 'spentBudget').where({user_id}).innerJoin('users', 'user_id', 'users.id')
>>>>>>> a500c055b983f9016cf5b9becf9420cef426a4f8
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
