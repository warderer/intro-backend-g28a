/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.hasTable('mascotas').then((exists) => {
        if (exists) {
            return knex.schema.hasColumn('user').then(exists => {
                if (!exists) {
                    return knex.schema.table('mascotas', (table) => {
                        table.integer('user').unsigned().references('users.user_id')
                    })
                }
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
