exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("shopping")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("shopping").insert([
        { party_id: 1, item: "lawn darts", quantity: 5, purchased: true },
        { party_id: 2, item: "cd players", quantity: 4 },
        { party_id: 3, item: "ping-pong table", quantity: 3 },
        { party_id: 4, item: "plastic guitar", quantity: 2 },
        { party_id: 5, item: "Xbox", quantity: 1, purchased: true },
        { party_id: 1, item: "plastic cups", quantity: 2 },
        { party_id: 2, item: "drinks", quantity: 3, purchased: true, cost: 2 },
        { party_id: 3, item: "coasters", quantity: 4 },
        { party_id: 4, item: "slip n' slide", quantity: 5 }
      ]);
    });
};
