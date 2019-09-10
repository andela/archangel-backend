import {
    onewayTripService,
    showManagerPendingAppr,
} from '../services/travelServices';
import { successResponseWithData, errorResponse } from '../utils/response';

import message from '../utils/messageUtils';
import statusCode from '../utils/statusCode';

const { oneWayTripService } = travelServices;
const { successResponseWithData, errorResponse } = response;

export default {
    createOneWayTrip: async(req, res) => {
        try {
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

            successResponseWithData(res, statusCode.created, message.oneWayTripCreated, data);
        } catch (err) {
            errorResponse(res, statusCode.serverError, err);
        }
    },
};
