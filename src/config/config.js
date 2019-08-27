import dotenv from 'dotenv';
import { Pool } from "pg";

dotenv.config();


const {
    DB_USERNAME,
    DATABASE,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    PORT,
    DB_DIALECT,
    SECRETE
} = process.env;

module.exports = {
    DB_USERNAME,
    DATABASE,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    PORT,
    DB_DIALECT,
    SECRETE,
    getPool: function (conusername,condatabase,conhost,conpassword,conssl){
        //if(pool) return pool;
        const pool = new Pool({
           host: conhost,
           user: conusername,
           database: condatabase,
           password: conpassword,
           port: "5432",
           ssl: conssl
       });
       return pool;
   }
       
};