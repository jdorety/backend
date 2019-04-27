const db = require("../../dbConfig.js");

module.exports = {
  addParty,
  getParty
};

function addParty(party) {
  return db("parties").insert({ ...party, user_id: party.id });
}

function getParty(id) {
  return db('parties').select('username', 'when', 'theme', 'numberGuest', 'budget', 'spentBudget').where({user_id: id}).innerJoin('users', 'user_id', 'users.id')
}
