import travelServices from '../services/travelServices';
import message from '../utils/messageUtils';
import response from '../utils/response';
import statusCode from '../utils/statusCode';

const { returnTripService } = travelServices;
const { successResponseWithData, errorResponse } = response;

export default {
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
}
