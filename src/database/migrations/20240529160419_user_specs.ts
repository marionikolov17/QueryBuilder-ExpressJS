import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("user_specs", (table) => {

    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("user_specs");
}

