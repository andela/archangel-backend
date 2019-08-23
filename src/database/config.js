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
        username: 'postgres',
        database: 'barefoot',
        password: '1battalion',
        host: '127.0.0.1',
        port: '5432',
        server_port: '5000',
        dialect: 'postgres'
    },
    test: {
        username: 'postgres',
        database: 'barefoot',
        password: '1battalion',
        host: '127.0.0.1',
        port: '5432',
        server_port: '5000',
        dialect: 'postgres'
    },
    production: {
        username: DB_USERNAME,
        database: DATABASE,
        password: DB_PASSWORD,
        host: DB_HOST,
        port: DB_PORT,
        server_port: PORT,
        dialect: 'postgres'
    }
};