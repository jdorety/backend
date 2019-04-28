exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { username: "john", password: "development1" },
        { username: "jacob", password: "development2" },
        { username: "jinglemeyer", password: "development3" }
      ]);
    });
};
