import { findUserById } from '../services/authServices';
import { findTravelById } from '../services/travelServices';
import { errorResponse } from '../utils/response';
import { isDateValid } from '../utils/dateUtils';

import message from '../utils/messageUtils';
import statusCode from '../utils/statusCode';

export const verifyDeptManagerAndRequestStatus = async(req, res, next) => {
    try {
        const { travel_id } = req.params;
        const manager = await findUserById(req.userData.id);
        const travel = await findTravelById(travel_id);

        if (travel === null) {
            return errorResponse(res, statusCode.notFound, message.travelNotFound);
        }
        const requester = await findUserById(travel.dataValues.user_id);
        const { first_name, last_name, dept_id } = requester.dataValues;
        if (dept_id !== manager.dataValues.dept_id) {
            return errorResponse(
                res,
                statusCode.unauthorized,
                message.diffDepartment
            );
        }
        if (travel.dataValues.approval_status !== 'pending') {
            return errorResponse(
                res,
                statusCode.unauthorized,
                message.requestNotPending
            );
        }
        req.body.requesterName = `${first_name} ${last_name}`;
        return next();
    } catch (err) {
        errorResponse(res, statusCode.serverError, err);
    }
};

export const verifyValidDate = (req, res, next) => {
    const { start_date } = req.query;
    let { end_date } = req.query;
    if (start_date === null || start_date === undefined) {
        return errorResponse(res, statusCode.badRequest, message.noStartDate)
    };
    if (end_date === null || end_date === undefined) {
        req.query.end_date = new Date();
        end_date = new Date();
    };
    if (!isDateValid(start_date)) {
        return errorResponse(res, statusCode.badRequest, message.invalidStartDate)
    };
    if (!isDateValid(end_date)) {
        return errorResponse(res, statusCode.badRequest, message.invalidEndDate)
    };
    return next();
}

export const verifyDeptManager = () => {};
export const verifyRequestStatus = () => {};