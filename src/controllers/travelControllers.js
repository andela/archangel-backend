import {
  onewayTripService,
  showManagerPendingAppr,
  searchTravel
} from "../services/travelServices";
import { successResponseWithData, errorResponse } from "../utils/response";

// import travelServices,{searchTravel} from '../services/travelServices';
import message from "../utils/messageUtils";
import statusCode from "../utils/statusCode";
import { paginate } from "../utils/pagination";

export default {
  createOneWayTrip: async (req, res) => {
    try {
      const {
        origin,
        destination,
        departure_date,
        accommodation_id,
        travel_purpose
      } = req.body;
      const userId = req.userData.id;

      const travelObj = {
        user_id: userId,
        travel_type: "one-way",
        origin,
        destination,
        departure_date,
        travel_purpose,
        accommodation_id
      };

      const data = await onewayTripService(travelObj);

      successResponseWithData(
        res,
        statusCode.created,
        message.oneWayTripCreated,
        data
      );
    } catch (err) {
      errorResponse(res, statusCode.serverError, err);
    }
  },

  pendingManagerApproval: async (req, res) => {
    const { role } = req.userData;

    const { manager } = req.params;

    if (role === "user") {
      errorResponse(res, statusCode.unauthorized, message.unauthorized);
    }

    try {
      const requestsPending = await showManagerPendingAppr(manager);

      const filteredRequests = requestsPending.filter(
        request => request["user.department.line_manager"] !== null
      );

      const requestNumbers = filteredRequests.length;

      // eslint-disable-next-line max-len
      successResponseWithData(
        res,
        statusCode.success,
        message.managerApproval(requestNumbers),
        filteredRequests
      );
    } catch (err) {
      errorResponse(res, statusCode.serverError, err);
    }
  }
};

/* search travels
 * @param {Object} req - server request
 * @param {Object} res - server response
 * @param {Object} next - server response
 * @returns {Object} - custom response
 */
export const searchTravels = async (req, res) => {
  try {
    const { body, query } = req;
    const { page, perPage } = query;
    const { rows, count } = await searchTravel(body, query);
    console.log("My search body", body);
    const meta = paginate(page, perPage, count, rows);
    return res.status(200).json({ success: { requests: rows, meta } });
  } catch (error) {
    console.log("My search error", error);
    return res.status(404).json({ error: error });
  }
};
