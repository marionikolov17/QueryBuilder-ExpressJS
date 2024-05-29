import knex from "./database/db";
import { DB_NAME } from "./config/db.config";

knex.raw(`CREATE DATABASE IF NOT EXISTS knex`)
    .then(() => {
        knex.destroy();
    })
    .finally(() => {
        console.log("Done.")
    });