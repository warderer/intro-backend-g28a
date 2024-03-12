/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.hasTable('mascotas')
    .then((exists) => {
        if (!exists) {
            return knex.schema.createTable('mascotas', (table) => {
                table.increments("mascota_id").primary();
                table.string("name").notNullable();
                table.string("breed").notNullable();
                table.integer("age");
                table.boolean("active").notNullable().defaultTo(true);
                table.timestamp("created_at").defaultTo(knex.fn.now());
            })
        }
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
