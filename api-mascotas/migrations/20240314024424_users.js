/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.hasTable('users').then((exists) => {
    if (!exists) {
        return knex.schema.createTable('users', (table) => {
            table.increments("user_id").primary();
            table.string("name").notNullable();
            table.string("last_name");
            table.string("phone_number").notNullable();
            table.boolean('active').notNullable().defaultTo(true);
            table.timestamp('created_at').defaultTo(knex.fn.now());
        });
    }
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
