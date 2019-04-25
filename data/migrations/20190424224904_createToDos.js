exports.up = function(knex, Promise) {
  return knex.schema.createTable("todo", tbl => {
    tbl.increments();
    tbl
      .integer("party_id")
      .unsigned()
      .references("id")
      .inTable("parties")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl.string("item").notNullable();
    tbl.boolean("completed");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("todo");
};
