// Update with your config settings.
import * as configs from "./src/config/db.config";

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const connection = {
  development: {
    client: 'mysql2',
    connection: {
      host: configs.DB_HOST,
      user: configs.DB_USERNAME,
      password: configs.DB_PASSWORD,
      database: configs.DB_NAME
    },
    migrations: {
      directory: "./src/database/migrations"
    }
  }
};

export default connection;