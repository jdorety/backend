exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("todos")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("todos").insert([
        { party_id: 3, item: "take out trash" },
        { party_id: 4, item: "polish the car" },
        { party_id: 5, item: "look at the sun" },
        { party_id: 4, item: "finish my project", completed: true },
        { party_id: 3, item: "get schwifty" },
        { party_id: 2, item: "look into rentals" },
        { party_id: 1, item: "calm down the neighbors", completed: true },
        { party_id: 1, item: "rock n' roll" },
        { party_id: 2, item: "relax", completed: true },
        { party_id: 3, item: "reconsider actions leading up to this moment" }
      ]);
    });
};
