exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("entertainment")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("entertainment").insert([
        { party_id: 1, item: "Bobbing for apples" },
        { party_id: 1, item: "karaoke" },
        { party_id: 2, item: "pin the tail on the donkey" },
        { party_id: 3, item: "beer pong" },
        { party_id: 3, item: "cake walk" },
        { party_id: 2, item: "dancing" },
        { party_id: 3, item: "dunking booth" },
        { party_id: 5, item: "watch Simpsons" },
        { party_id: 1, item: "jump rope competitions" },
        { party_id: 5, item: "ring toss" },
        { party_id: 4, item: "watch the cats fight" },
        { party_id: 4, item: "play Rock Band" },
        { party_id: 4, item: "get crazy" }
      ]);
    });
};
