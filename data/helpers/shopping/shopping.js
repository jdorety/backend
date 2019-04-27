const db = require("../../dbConfig.js");

module.exports = {
  add,
  getList,
  edit,
  remove
};

function add(item) {
  return db("shopping").insert({ ...item });
}

function getList(party_id) {
  return db("shopping")
    .where({ party_id })
    .select("id", "item", "quantity", "purchased", "cost");
}

function edit(id, item) {
  return db("shopping")
    .where({ id })
    .update({ ...item });
}

function remove(id) {
  return db("shopping")
    .where({ id })
    .del();
}
