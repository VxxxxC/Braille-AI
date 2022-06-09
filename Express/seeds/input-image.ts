import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Inserts seed entries
    await knex("images").insert({
        image: "test_image_input_by_knex_seed",
        uploaded_date: "now()"
    })
        .returning("id")
        .then((res) => {
            let result = res;
            let id = result[0].id
            console.log(`image ID is : ${id}`)
        })
};
