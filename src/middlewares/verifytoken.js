import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
dotenv.config();
const { secrete } = process.env;

//***SUGGESTION */ 
//Make it easy to use just one connection to db for multiple endpoint
export const LogoutAction = (req,res,next) => {req.action = "logout"; next(); }

//any other action can come in like so , to use the same connection to the db
//export const anothertAction = (req,res,next) => {req.action = "alertuser"; next(); }


export const getToken = (req,res,next) => {
    const bearerHeader = req.headers["authorization"];
		if (typeof bearerHeader !== "undefined") {  
            const berarer = bearerHeader.split(" "); 
            const bearerToken = berarer[1]; 
            req.token = bearerToken;
            next();
        } else {
            res.status(403).json({error:"Not authorized"}); 
        }
}
export const verifyToken = (req,res,next) => {
    jwt.verify(req.token, secrete, (err, data) => {
        if (err) {
            res.status(403).json({error:"Not authorized ,Please log in"});
        }else{
            req.userData = data;
            next();
        }; 
    });

}
