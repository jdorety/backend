const db = require("../../dbConfig.js");

module.exports = {
  add,
  getList,
  edit,
  remove,
  getBudget
};
//add passed item object to shopping table
function add(item) {
  return db("shopping")
    .insert({ ...item })
    .returning("id");
}
//get array containing objects associated with the party_id passed
function getList(party_id) {
  return db("shopping")
    .where({ party_id })
    .select("id", "item", "quantity", "purchased", "cost");
}
//edit item w/ matching id, using changes passed as item object
function edit(id, item) {
  return db("shopping")
    .where({ id })
    .update({ ...item });
}
//remove item w/ matching id
function remove(id) {
  return db("shopping")
    .where({ id })
    .del();
}

async function getBudget(party_id) {
  const budget = await db("shopping")
    .select("cost")
    .where({ party_id });
  return budget.map(item => item.cost);
}
