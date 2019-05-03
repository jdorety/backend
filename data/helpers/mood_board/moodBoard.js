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
  return db("mood_board")
    .select("id", "party_id", "url")
    .where({ party_id });
}

function getById(id) {
  return db("mood_board").where({ id });
}

function remove(id) {
  return db("mood_board")
    .where({ id })
    .del();
}
