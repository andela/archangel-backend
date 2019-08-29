import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
dotenv.config();
const { secrete } = process.env;



export default {
    getToken : (req,res,next) => {
        const bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== "undefined") {  
            const berarer = bearerHeader.split(" "); 
            const bearerToken = berarer[1]; 
            req.token = bearerToken;
            next();
        } else {
            res.status(403).send({error:"Not authorized"}); 
        }
    },
    verifyToken: (req,res,next) => {
        jwt.verify(req.token, secrete, (err, data) => {
            if (err) {
                res.status(403).send({error:"Not authorized ,Please log in"});
            }else{
                req.userData = data;
                next();
            }; 
        });
    
    }

};
