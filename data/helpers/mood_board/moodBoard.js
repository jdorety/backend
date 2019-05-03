const db = require("../../dbConfig.js");

module.exports = {
  add,
  getList,
  getById,
  remove
};

function add(image) {
  return db("mood_board")
    .insert({ ...image })
    .returning("id", "party_id", "url");
}

function getList(party_id) {
  return db("mood_board").where({ party_id });
}

function getById(id) {
  return db("mood_board")
    .where({ id })
    .first();
}

function remove(id) {
  return db("mood_board")
    .where({ id })
    .del();
}
