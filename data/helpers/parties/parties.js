const db = require("../../dbConfig.js");

module.exports = {
  add,
  get,
  edit,
  remove
};

function add(party) {
  return db("parties").insert({ ...party, user_id: party.id });
}

function get(id) {
  return db('parties').select('parties.id', 'username', 'when', 'theme', 'numberGuest', 'budget', 'spentBudget').where({user_id: id}).innerJoin('users', 'user_id', 'users.id')
}

function edit(id, party) {
  return db('parties').where({id}).update({...party});
}

function remove(id) {
  return db('parties').where({id}).del();
}