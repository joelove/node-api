exports.up = (knex, Promise) => Promise.all([
  knex.schema.createTable('samples', table => {
    table.uuid('id').notNullable().primary();
    table.string('page').notNullable();
    table.integer('count').defaultTo(0);
  }),
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTable('samples'),
]);
