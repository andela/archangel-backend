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

export const db = {
  DB_USERNAME,
  DATABASE,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  PORT,
  DB_DIALECT
};


let connection;

if (process.env.NODE_ENV === 'test') {
  connection = {
    connectionString: process.env.TESTDB_URL
  };
}
connection = {
  connectionString: process.env.DATABASE_URL
};
