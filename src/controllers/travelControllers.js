import travelServices from '../services/travelServices';
import message from '../utils/messageUtils';
import response from '../utils/response';
import statusCode from '../utils/statusCode';

const { onewayTripService, showManagerPendingAppr } = travelServices;
const { successResponseWithData, errorResponse } = response;

export default {
    createOneWayTrip: async (req, res) => {
        try {
            const {
              origin, destination, departure_date, travel_purpose
            } = req.body;
            const userId = req.userData.id;

            const travelObj = {
              user_id: userId, origin, destination, departure_date, travel_purpose
            };

            const data = await onewayTripService(travelObj);

            successResponseWithData(res, statusCode.created, message.oneWayTripCreated, data);
        } catch (err) {
            errorResponse(res, statusCode.serverError, err);
        }
    },

    pendingManagerApproval: async (req, res) => {
        const { role } = req.userData;

        const { manager } = req.params;

        if (role === 'user') {
            errorResponse(res, statusCode.unauthorized, message.unauthorized);
        }

        try {
            const requestsPending = await showManagerPendingAppr(manager);

            const filteredRequests = requestsPending.filter(request => request['user.department.line_manager'] !== null);

            const requestNumbers = filteredRequests.length;

            successResponseWithData(res,
              statusCode.success, message.managerApproval(requestNumbers), filteredRequests);
        } catch (err) {
            errorResponse(res, statusCode.serverError, err);
        }
    }
};
