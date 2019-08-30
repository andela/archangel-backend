import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import message from '../utils/messageUtils';
import response from '../utils/response';
import statusCode from '../utils/statusCode';

dotenv.config();

const { successResponseWithData, errorResponse } = response;

const jwtSecret = process.env.JWT_SECRET;

// This function generates a token
export default {
    generateToken: (id, email, role, first_name) => {
        const payload = { id, email, role, first_name };
        const option = { expiresIn: '1d' }
            // Adding the string bearer to jwt object and get token string
        return jwt.sign(payload, jwtSecret, option);
    },
    getToken : (req,res,next) => {
        const bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== "undefined") {  
            const berarer = bearerHeader.split(" "); 
            const bearerToken = berarer[1]; 
            req.token = bearerToken;
            return next();
        } else {
            return errorResponse(res, statusCode.unauthorized, message.unauthorized);
        }
    },
    verifyToken: (req,res,next) => {
        jwt.verify(req.token, jwtSecret, (err, data) => {
            if (err) {
                return errorResponse(res, statusCode.unauthorized, message.invalidToken);
            }else{
                req.userData = data;
                return next();
            }; 
        });
    },
    // verifyToken: async(req, res, next) => {
    //     const token = req.headers.authorization || req.headers['x-auth-token'] || req.query.token || req.body.token;
    //     if (!token) {
    //         return res.status(401).send({
    //             status: 401,
    //             message: 'You have not provided a token for authorization',
    //         });
    //     }
    //     try {
    //         req.payload = await jwt.verify(token, jwtSecret);
    //         return next();
    //     } catch (err) {
    //         return res.status(401).send({
    //             status: 401,
    //             message: 'You are unauthorized, token is invalid or expired',
    //         });
    //     }
    // },
};