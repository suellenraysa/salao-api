import path from 'path';
import databaseConfig from './src/config/database';

module.exports = {
  development: {
    client: 'postgres',
    connection: {
      host: databaseConfig.host,
      database: databaseConfig.database,
      user: databaseConfig.user,
      password: databaseConfig.password,
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
    },
    seeds: {
      directory: path.resolve(__dirname, 'src', 'database', 'seeds'),
    },
  },
};
