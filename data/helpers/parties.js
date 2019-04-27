const db = require("../dbConfig.js");

module.exports = {
  addParty,
  getParty
};

async function addParty(party) {
  return db("parties").insert({ ...party, user_id: party.id });
}

async function getParty(id) {
  return db('parties').select('username', 'when', 'theme', 'numberGuest', 'budget', 'spentBudget').where({user_id: id}).innerJoin('users', 'user_id', 'users.id')
}
