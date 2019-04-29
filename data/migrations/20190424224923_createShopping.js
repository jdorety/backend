
exports.up = function(knex, Promise) {
  return knex.schema.createTable('shopping', tbl => {
    tbl.increments();
    tbl
      .integer("party_id")
      .unsigned()
      .references("id")
      .inTable("parties")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl.string('item').notNullable();
    tbl.integer('quantity').defaultTo(1);
    tbl.boolean('purchased').defaultTo(false);
    tbl.float('cost').defaultTo(0);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('shopping');
};
