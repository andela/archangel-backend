import db from "../config/config";
const {DB_USERNAME, DATABASE, DB_PASSWORD, DB_HOST } = process.env;
const pool = db.getPool(DB_USERNAME,DATABASE,DB_HOST,DB_PASSWORD,true);
 

 export const connectDb = (preparedQuery,queryParams,action) => {
    return new Promise ((reject,resolve)=>{
        pool.query(preparedQuery,queryParams,(err,result)=>{
            if(result){
                let data;
                 data = (action == "logout" ? "Logged out" : action)
                resolve(data)
            }else{
                reject(new Error('Error! occured please try again'));
            }
        })
    })
 }
 