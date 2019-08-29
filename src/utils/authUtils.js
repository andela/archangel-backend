import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

// This function generates a token
export default {
    generateToken: (id, email, role, first_name) => {
        const payload = { id, email, role, first_name };
        const option = { expiresIn: '1d' }
            // Adding the string bearer to jwt object and get token string
        return jwt.sign(payload, jwtSecret, option);
    },
    verifyToken: async(req, res, next) => {
        const token = req.headers.authorization || req.headers['x-auth-token'] || req.query.token || req.body.token;
        if (!token) {
            return res.status(401).send({
                status: 401,
                message: 'You have not provided a token for authorization',
            });
        }
        try {
            req.payload = await jwt.verify(token, jwtSecret);
            return next();
        } catch (err) {
            return res.status(401).send({
                status: 401,
                message: 'You are unauthorized, token is invalid or expired',
            });
        }
    },
};