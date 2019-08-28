import dotenv from 'dotenv';

dotenv.config();

const {
    DB_USERNAME,
    DATABASE,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    PORT,
    DB_DIALECT
} = process.env;

module.exports = {
    DB_USERNAME,
    DATABASE,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    PORT,
    DB_DIALECT
};