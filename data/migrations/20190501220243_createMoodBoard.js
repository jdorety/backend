exports.up = function(knex, Promise) {
  return knex.schema.createTable("mood_board", tbl => {
    tbl.increments();
    tbl.string("public_id").notNullable();
    tbl
      .integer("party_id")
      .unsigned()
      .references("id")
      .inTable("parties")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl.text("url").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("mood_board");
};
