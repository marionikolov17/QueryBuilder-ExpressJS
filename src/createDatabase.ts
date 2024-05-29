import knex from "./database/db";
import { DB_NAME } from "./config/db.config";

knex.raw(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`)
    .then(() => {
        knex.destroy();
    });