import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
   await knex.schema.createTable("images", (table) => {
      table.increments();
      table.string("image");
      table.date("uploaded_date")
   })
}


export async function down(knex: Knex): Promise<void> {
   await knex.schema.dropTable("images");
}

