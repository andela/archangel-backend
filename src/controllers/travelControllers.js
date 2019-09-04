import travelServices from '../services/travelServices';
import message from '../utils/messageUtils';
import response from '../utils/response';
import statusCode from '../utils/statusCode';

const { onewayTripService, returnTripService } = travelServices;
const { successResponseWithData, errorResponse } = response;

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

    createReturnTrip: async (req, res) => {
      try {
        const { travel_type, origin, destination, departure_date, return_date,
                travel_purpose, accommodation_id, multi_city } = req.body;

        var user_id = req.userData.id;

        const travelRequestData = { user_id, travel_type, origin, destination, departure_date, return_date,
                travel_purpose, accommodation_id, multi_city};

        const data = await returnTripService(travelRequestData);

        successResponseWithData(res, statusCode.created, message.returnTripCreated, data);
      }
      catch (err) {
          errorResponse(res, err.statusCode || statusCode.serverError, err);
      }
    }
};
