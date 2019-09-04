require('dotenv').config();

const {
    /* DATABASE_URL, */
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DATABASE,
} = process.env;

module.exports = {
    development: {
        // use_env_variable: DATABASE_URL,
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DATABASE,
        host: DB_HOST,
        port: DB_PORT,
        dialect: 'postgres',
    },
    test: {
        // use_env_variable: DATABASE_URL,
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DATABASE,
        host: DB_HOST,
        port: DB_PORT,
        dialect: 'postgres',
    },
    production: {
        // use_env_variable: DATABASE_URL,
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DATABASE,
        host: DB_HOST,
        port: DB_PORT,
        dialect: 'postgres',
    },
};
