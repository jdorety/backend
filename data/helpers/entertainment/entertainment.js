const db = require("../../dbConfig.js");

module.exports = {
  add,
  getList,
  update,
  remove
};

<<<<<<< HEAD
//adds entertainment option using party_id and item
function add(party_id, item) {
  return db("entertainment").insert({ party_id, item });
=======
//adds entertainment option using object containing party_id and item
function add(item) {
  return db("entertainment").insert({ item });
>>>>>>> a500c055b983f9016cf5b9becf9420cef426a4f8
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
