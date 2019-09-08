import travelServices from '../services/travelServices';
import authServices from '../services/authServices';
import message from '../utils/messageUtils';
import response from '../utils/response';
import statusCode from '../utils/statusCode';

const { onewayTripService, showMgrPendingAppr } = travelServices;
const { successResponseWithData, errorResponse } = response;
const { findUserById } = authServices;

export default {
    createOneWayTrip: async(req, res) => {
        try {
            const { origin, destination, departure_date, travel_purpose } = req.body;
            const userId = req.userData.id;
            
            const travelObj = { user_id:userId, origin, destination, departure_date, travel_purpose };

            const data = await onewayTripService(travelObj);
        
            successResponseWithData(res, statusCode.created, message.oneWayTripCreated, data);
        } catch (err) {
            errorResponse(res, statusCode.serverError, err);
        }
    },

    pendingManagerApproval: async(req, res) => {
        const { role, id } = req.userData;

        if (role == 'user') {
            errorResponse(res, statusCode.unauthorized, message.unauthorized);
        }

        try {
            const managerData = await findUserById(id);

            const manager = `${managerData.first_name} ${managerData.last_name}`;

            const data = await showManagerPendingAppr(manager);

            successResponseWithData(res, statusCode.success, message.managerApproval, data);
        } catch (err) {
            errorResponse(res, statusCode.serverError, err);
        }
    }
};
