const db = require("../../dbConfig.js");

module.exports = {
  add,
  getList,
  update,
  remove
};
//add todo item to todos table using object containing party_id and item
<<<<<<< HEAD
function add({ party_id, item }) {
=======
function add({party_id, item}) {
>>>>>>> a500c055b983f9016cf5b9becf9420cef426a4f8
  return db("todos").insert({ party_id, item });
}
//return array containing objects associated w/ the passed party_id
function getList(party_id) {
  return db("todos").where({ party_id });
}
//update record w/ matching id, using values passed in as todo object
function update(id, todo) {
  return db("todos")
    .where({ id })
<<<<<<< HEAD
    .update({ ...todo });
=======
    .update({...todo});
>>>>>>> a500c055b983f9016cf5b9becf9420cef426a4f8
}
//remove record in todos table w/ matching id
function remove(id) {
  return db("todos")
    .where({ id })
    .del();
}
