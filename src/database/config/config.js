require('dotenv').config();

const { DB_USERNAME, DATABASE, DB_PASSWORD, DB_HOST, DB_PORT, DB_DIALECT } = process.env;
module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DATABASE,
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DATABASE,
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DATABASE,
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT
  }
}
