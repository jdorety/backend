
exports.up = function(knex, Promise) {
  return knex.schema.createTable('entertainment', tbl => {
    tbl.increments();
    tbl
      .integer("party_id")
      .unsigned()
      .references("id")
      .inTable("parties")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl.string('item');
    tbl.boolean('ready').defaultTo(false);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('entertainment');
};
