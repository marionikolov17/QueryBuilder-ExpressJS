// Update with your config settings.
const configs = require("./src/config/db.config");

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'mysql',
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
