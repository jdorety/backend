const db = require("../../dbConfig.js");

module.exports = {
  addParty,
  getParty,
  editParty
};

function addParty(party) {
  return db("parties").insert({ ...party, user_id: party.id });
}

function getParty(id) {
  return db('parties').select('parties.id', 'username', 'when', 'theme', 'numberGuest', 'budget', 'spentBudget').where({user_id: id}).innerJoin('users', 'user_id', 'users.id')
}

function editParty(id, party) {
  return db('parties').where({id}).update({...party});
}
