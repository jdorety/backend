exports.up = function(knex, Promise) {
  return knex.schema.createTable("parties", tbl => {
    tbl.increments();
    tbl
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl.integer("numberGuest").unsigned();
    tbl.datetime("when");
    tbl.string("theme");
    tbl.integer("budget");
    tbl.integer("spentBudget");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("parties");
};
