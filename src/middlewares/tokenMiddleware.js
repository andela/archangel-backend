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
        const option = { expiresIn: '1d' };
            // Adding the string bearer to jwt object and get token string
        return `Bearer ${jwt.sign(payload, jwtSecret, option)}`;
    },
    getToken: (req, res, next) => {
        const bearerHeader = req.headers.authorization;
        if (typeof bearerHeader !== 'undefined') {
            const berarer = bearerHeader.split(' ');
            const bearerToken = berarer[1];
            req.token = bearerToken;
            return next();
        }
            return errorResponse(res, statusCode.unauthorized, message.unauthorized);
    },
    verifyToken: (req, res, next) => {
        jwt.verify(req.token, jwtSecret, (err, data) => {
            if (err) {
                return errorResponse(res, statusCode.unauthorized, message.invalidToken);
            }
                req.userData = data;
                return next();
          });
    }
  };
