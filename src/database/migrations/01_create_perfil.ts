import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('perfil', table => {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.boolean('ativo').defaultTo(true);

    table
      .integer('usuario_id')
      .notNullable()
      .references('id')
      .inTable('usuario')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
}

export async function down(Knex: Knex) {
  return Knex.schema.dropTable('perfil');
}
