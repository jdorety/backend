const db = require("../../dbConfig.js");

module.exports = {
  add,
  getList,
  update,
  remove
};

//adds entertainment option using party_id and item
function add(item) {
  return db("entertainment").insert({ ...item });
}
//gets list of items associated with a party's id
function getList(party_id) {
  return db("entertainment")
    .where({ party_id })
    .select("id", "item", "ready");
}
//updates a record w/ matching id with appropriate key/value pairs in edit object
function update(id, edit) {
  return db("entertainment")
    .where({ id })
    .update({ ...edit });
}
//removes record w/ matching id
function remove(id) {
  return db("entertainment")
    .where({ id })
    .del();
}
