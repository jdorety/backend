exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex
    .raw("TRUNCATE TABLE parties RESTART IDENTITY CASCADE")
    .then(function() {
      // Inserts seed entries
      return knex("parties").insert([
        {
          user_id: 1,
          numberGuest: 32,
          when: new Date(),
          theme: "Harvest",
          budget: 45
        },
        {
          user_id: 2,
          numberGuest: 65,
          when: "02/14/2020",
          theme: "Love",
          budget: 500
        },
        {
          user_id: 2,
          numberGuest: 54,
          when: new Date(),
          theme: "Birthday",
          budget: 200
        },
        {
          user_id: 3,
          numberGuest: 83,
          when: "08/10/2019",
          theme: "Summer",
          budget: 2050
        },
        {
          user_id: 3,
          numberGuest: 18,
          when: "06/17/2019",
          theme: "Gettin' Crazy",
          budget: 250
        }
      ]);
    });
};
