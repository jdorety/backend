const db = require("../../dbConfig.js");

module.exports = {
  add,
  getList,
  update,
  remove
};
//add todo item to todos table using object containing party_id and item
function add(item) {
  return db("todos").insert({ ...item });
}
//return array containing objects associated w/ the passed party_id
function getList(party_id) {
  return db("todos")
    .select("id", "item", "completed")
    .where({ party_id });
}
//update record w/ matching id, using values passed in as todo object
function update(id, todo) {
  return db("todos")
    .where({ id })
    .update({ ...todo });
}
//remove record in todos table w/ matching id
function remove(id) {
  return db("todos")
    .where({ id })
    .del();
}
