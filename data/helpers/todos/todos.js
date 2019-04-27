const db = require("../../dbConfig.js");

module.exports = {
  add,
  getList,
  update,
  remove
};

function add(party_id, item) {
  return db("todos").insert({ party_id, item });
}

function getList(party_id) {
  return db("todos").where({ party_id });
}

function update(...todo) {
  return db("todos")
    .where({ id })
    .update({ item, completed });
}

function remove(id) {
  return db("todos")
    .where({ id })
    .del();
}
