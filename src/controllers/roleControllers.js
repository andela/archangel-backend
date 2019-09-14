import { roleUpdate } from '../services/roleServices';
import {
    successResponseWithData,
    successResponse,
    errorResponse,
} from '../utils/response';

import message from '../utils/messageUtils';
import statusCode from '../utils/statusCode';

export const assignRole = async(req, res) => {
    try {
        const { user_id } = req.params;
        const { role } = req.body;
        const updatedUser = await users.roleUpdate({
            where: {
                user_id
            },
            role: newRole
        });
        const returnedData = updatedUser.dataValues;

        successResponseWithData(
            res,
            statusCode.success,
            message.roleUpdate,
            returnedData
        );
    } catch (err) {
        errorResponse(res, statusCode.serverError, err);
    }
};
