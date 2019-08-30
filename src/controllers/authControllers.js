import authServices from '../services/authServices';
import authUtils from '../utils/authUtils';

import message from '../utils/messageUtils';
import response from '../utils/response';
import statusCode from '../utils/statusCode';

const { signupService } = authServices;
const { generateToken } = authUtils;
const { successResponseWithData, errorResponse } = response;

export default {
    signup: async(req, res) => {
        try {
            const { first_name, last_name, email, password } = req.body;
            const userObj = { first_name, last_name, email, password, role: 'user' };

            const user = await signupService(userObj);
            const data = user.dataValues;

            data.token = generateToken(data.id, email, data.role, first_name);
            delete data.password;
            successResponseWithData(res, statusCode.created, message.signupSuccess(email), data);
        } catch (err) {
            errorResponse(res, statusCode.serverError, err);
        }
    },

    fbgooglesignup: async (req, res) => {
        try {
            const { first_name, last_name, email, id, role } = req.user;

            const data = {
                first_name,
                last_name,
                email,
                role
            };

            successResponseWithData(res, statusCode.created, message.signupSuccess(email), data);
        } catch(err) {
            errorResponse(res, statusCode.serverError, err);
        }    
    }
};
