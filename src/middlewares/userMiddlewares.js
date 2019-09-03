import authServices from '../services/authServices';

import message from '../utils/messageUtils';
import response from '../utils/response';
import statusCode from '../utils/statusCode';

const { errorResponse } = response;
const { findUserByEmail } = authServices;

export default {
    confirmUserEmail: async (req, res, next) => {
        const { email } = req.body;
        const user = await findUserByEmail(email);

        if (!user) {
            return errorResponse(res, statusCode.notFound, message.unregisteredEmail(email));
        }
        req.body.full_name = `${user.first_name} ${user.last_name}`;
        return next();
    },
};
