import knex from "knex";
import knexFile from "./../../knexfile";

const environment = "development";

export default knex(knexFile[environment]);