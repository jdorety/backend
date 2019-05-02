exports.up = function(knex, Promise) {
  return knex.schema.createTable("mood_board", tbl => {
    tbl.increments();
    tbl
      .integer("party_id")
      .unsigned()
      .references("id")
      .inTable("parties")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl.text("url");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("mood_board");
};
