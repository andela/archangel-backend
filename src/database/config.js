import { pool } from 'pg';
import config from '../config/config';

const {
    DB_USERNAME,
    DATABASE,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    PORT,
    DB_DIALECT
} = config;

const pool = new pool({
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DATABASE,
    host: DB_HOST,
    port: DB_PORT,
    server_port: PORT,
    dialect: DB_DIALECT
});

export default config;