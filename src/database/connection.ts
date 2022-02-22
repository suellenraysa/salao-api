import knex from 'knex';
import databaseConfig from '../config/database';

const db = knex({
  client: 'postgres',
  connection: {
    // host: databaseConfig.host,
    // database: databaseConfig.database,
    // user: databaseConfig.user,
    // password: databaseConfig.password,
    // host: "localhost",
    // database: "projetofinalv1",
    // user: "postgres",
    // password: "123456",

    // host: "localhost",
    // database: "teste02",
    // user: "postgres",
    // password: "raijin75716",
    host: "localhost",
    database: "projetofinalv1",
    user: "postgres",
    password: "123456",
  },
  useNullAsDefault: true,
  debug: true
});

export default db;