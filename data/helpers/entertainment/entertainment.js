const db = require("../../dbConfig.js");

module.exports = {
  add,
  getList,
  update,
  remove
};

function add(item) {
  return db("entertainment").insert({ item });
}

function getList(party_id) {
  return db("entertainment")
    .where({ party_id })
    .select("id", "item", "ready");
}

function update(id, edit) {
  return db("entertainment")
    .where({ id })
    .update({ ...edit });
}

function remove(id) {
  return db("entertainment")
    .where({ id })
    .del();
}
