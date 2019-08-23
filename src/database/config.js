import dotenv from 'dotenv';

dotenv.config();

const {
    DB_USERNAME,
    DATABASE,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    PORT,
} = process.env;

module.exports = {
    development: {
        username: DB_USERNAME,
        database: DATABASE,
        password: DB_PASSWORD,
        host: DB_HOST,
        port: DB_PORT,
        server_port: PORT,
        Dialect: 'postgres'
    },
    test: {
        username: DB_USERNAME,
        database: DATABASE,
        password: DB_PASSWORD,
        host: DB_HOST,
        port: DB_PORT,
        server_port: PORT,
        Dialect: 'postgres'
    },
    production: {
        username: DB_USERNAME,
        database: DATABASE,
        password: DB_PASSWORD,
        host: DB_HOST,
        port: DB_PORT,
        server_port: PORT,
        Dialect: 'postgres'
    }
};