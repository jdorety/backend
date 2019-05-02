const db = require("../../dbConfig.js");

module.exports = {
  add
};

function add(party_id, url) {
  return db("mood_board")
    .insert({ party_id, url })
    .returning({ party_id, url });
}
