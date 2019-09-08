import travelServices from '../services/travelServices';
import message from '../utils/messageUtils';
import response from '../utils/response';
import statusCode from '../utils/statusCode';

const { returnTripService } = travelServices;
const { successResponseWithData, errorResponse } = response;

export default {
  createReturnTrip: async (req, res) => {
    try {
console.log('i am hsdsd');
      var user_id = req.userData.id;

      const travelRequestData = { user_id, ...req.body};

      const data = await returnTripService(travelRequestData);

      successResponseWithData(res, statusCode.created, message.returnTripCreated, data);
    }
    catch (err) {
        errorResponse(res, err.statusCode || statusCode.serverError, err);
        console.log(err);
    }
  }
}
