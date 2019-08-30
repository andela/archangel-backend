import authServices from '../services/authServices';
import tokenMiddleware from '../middlewares/tokenMiddleware';

import message from '../utils/messageUtils';
import response from '../utils/response';
import statusCode from '../utils/statusCode';

const { signupService,logoutService } = authServices;
const { generateToken } = tokenMiddleware;
const { successResponseWithData, successResponse, errorResponse } = response;

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
    logout: async (req,res) => {
        try {
            const { token } = req;
            await logoutService(token);
            successResponse(res, statusCode.success, message.logoutSuccess);
        } catch (err) {
            errorResponse(res, statusCode.serverError, err.message);
        }
    }
};
