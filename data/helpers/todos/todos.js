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

function getList(id) {
  return db("parties")
    .select("todos.id", "item", "completed")
    .innerJoin("todos", "parties.id", "todos.party_id")
    .where({ id });
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
