import socketEmission from '../services/websocket';
import authServices from '../services/authServices';
import travelServices from '../services/travelServices';
import message from '../utils/messageUtils';
import statusCode from '../utils/statusCode';
import sendVerificationEmail from '../utils/email';

const { oneWayTripService } = travelServices;
const { successResponseWithData, errorResponse } = response;
const { findUserById } = authServices;

const { emission } = socketEmission;

export default {
    createOneWayTrip: async(req, res) => {
        try {
            const { id } = req.token;
            const aUser = await findUserById(id);
            const { email, dept_id } = aUser;
            if (!dept_id) {
                errorResponse(res, statusCode.badRequest, message.lineManager);
            }
            const {
                origin,
                destination,
                departure_date,
                travel_purpose
            } = req.body;
            const userId = req.userData.id;

            const travelObj = {
                user_id: userId,
                origin,
                destination,
                departure_date,
                travel_purpose
            };

            const data = await oneWayTripService(travelObj);

            const emailVerify = await sendVerificationEmail(email,
                'Travel Confirmation', message.notifyUser);
            emission('here', 'we made it');
            successResponseWithData(res, statusCode.created, message.oneWayTripCreated, data);
        } catch (err) {
            errorResponse(res, statusCode.serverError, err);
        }
    },
};
