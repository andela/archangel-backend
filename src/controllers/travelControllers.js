import {
  onewayTripService,
  returnTripService,
  showManagerPendingAppr,
  showUsertravelsStatus
} from '../services/travelServices';
import { successResponseWithData, errorResponse } from '../utils/response';

import message from '../utils/messageUtils';
import statusCode from '../utils/statusCode';

export default {
  createOneWayTrip: async (req, res) => {
    try {
      const travel_type = 'one-way';
      const user_id = req.userData.id;

      const travelObj = {
        user_id,
        travel_type,
        ...req.body
      };

      const createdOnewayTripData = await onewayTripService(travelObj);

      successResponseWithData(res, statusCode.created, message.oneWayTripCreated, createdOnewayTripData);
    } catch (err) {
      errorResponse(res, statusCode.serverError, err);
    }
  },

  createReturnTrip: async (req, res) => {
    try {
      var user_id = req.userData.id;

      const travelRequestData = { user_id, ...req.body };

      const createdReturnTripData = await returnTripService(travelRequestData);

      successResponseWithData(res, statusCode.created, message.returnTripCreated, createdReturnTripData);
    } catch (err) {
      errorResponse(res, err.statusCode || statusCode.serverError, err);
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

      // eslint-disable-next-line max-len
      successResponseWithData(res, statusCode.success, message.managerApproval(requestNumbers), filteredRequests);
    } catch (err) {
      errorResponse(res, statusCode.serverError, err);
    }
  },

  getUserTravelStatus: async(req, res) => {
		const { role, id } = req.userData;

		if (role === 'admin') {
     return errorResponse(res, statusCode.unauthorized, message.unauthorized);
		} else {
      try {
        const data = await showUsertravelsStatus(id);
        return successResponseWithData(res, statusCode.success, message.userApproval, data);
      } catch (error) {
        errorResponse(res, statusCode.serverError, error);
      }
    }
	}
};
