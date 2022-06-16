import { config } from "dotenv";

config()
let mode = process.env.NODE_ENV || 'development'
const Config = config({ path: '.env.test' + mode });

if (Config.error) {
  console.log("we got and envconfig error : ", Config.error)
} else {
  console.log("dotenv config : ", Config)
}

export let env = {
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  SESSION_SECRET: 'Braille',  // FIXME: 暫時hardcoded
  PORT: 8000,
  DB_HOST: 'localhost',
  NODE_ENV: 'development',
}

if (process.env.NODE_ENV === 'test') {
  env.DB_HOST = process.env.POSTGRES_HOST
  env.DB_NAME = process.env.POSTGRES_DB
  env.DB_USER = process.env.POSTGRES_USER
  env.DB_PASSWORD = process.env.POSTGRES_PASSWORD
}