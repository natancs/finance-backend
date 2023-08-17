import knexfile from "../../knexfile.js"
import knex from "knex"

export const knexDB = knex(knexfile.development)