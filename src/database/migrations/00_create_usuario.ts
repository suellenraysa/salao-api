import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('usuario', table => {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.string('cpf').notNullable();
    table.date('data_nasc').notNullable();
    table.enum('sexo', ['F', 'M']).notNullable();
    table.string('telefone').notNullable();
    table.string('email').notNullable();
    table.string('login').notNullable();
    table.string('senha').notNullable();

    table
      .integer('perfil_id')
      .notNullable()
      .references('id')
      .inTable('perfil')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
}

export async function down(Knex: Knex) {
  return Knex.schema.dropTable('usuario');
}
