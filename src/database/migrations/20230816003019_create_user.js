/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return await knex.schema.createTable('users', (table) => {
    table.string("id", 255).notNullable()
    table.string("name", 255).notNullable()
    table.string("email", 255).notNullable()
    table.string("password", 255).notNullable()
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return await knex.schema.dropTable("users")
};
