import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import { errorResponse } from '../utils/response';
import message from '../utils/messageUtils';
import statusCode from '../utils/statusCode';

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

// This function generates a token
export const generateToken = (id, email, role, first_name) => {
  const payload = {
    id,
    email,
    role,
    first_name,
  };
  const option = { expiresIn: '1d' };
  // Adding the string bearer to jwt object and get token string
  return `Bearer ${jwt.sign(payload, jwtSecret, option)}`;
};

export const getToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    return next();
  }
  return errorResponse(res, statusCode.unauthorized, message.unauthorized);
};

export const verifyToken = (req, res, next) => {
  jwt.verify(req.token, jwtSecret, (err, data) => {
    if (err) {
      return errorResponse(res, statusCode.unauthorized, message.invalidToken);
    }
    req.userData = data;
    return next();
  });
};
