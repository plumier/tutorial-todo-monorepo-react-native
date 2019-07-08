import {Config} from "knex";
import dotenv from "dotenv"

dotenv.config()

//change this to your database configuration
export const configuration : Config = {
    client: 'mysql2',
    connection: process.env.DB_URI,
    migrations: {
        tableName: '_knex_migration',
        directory: "./db/migration"
    },
    seeds: {
        directory: "./db/seeds"
    }
}
export const development: Config ={ ...configuration}
export const production: Config={ ...configuration}
