import {
  onewayTripService,
  showManagerPendingAppr,
  showUsertravelsStatus,
  approveTravel,
  mostTraveled
} from '../services/travelServices';
import { findUserByEmail } from '../services/authServices';
import { successResponseWithData, errorResponse } from '../utils/response';

import message from '../utils/messageUtils';
import statusCode from '../utils/statusCode';

export const createOneWayTrip = async (req, res) => {
  try {
    const user = await findUserByEmail(req.userData.email);
    const { id, dept_id } = user.dataValues;

    const data = await onewayTripService({
      user_id: id,
      travel_type: 'one-way',
      ...req.body,
      dept_id,
    });

    successResponseWithData(
      res,
      statusCode.created,
      message.oneWayTripCreated,
      data
    );
  } catch (err) {
    errorResponse(res, statusCode.serverError, err);
  }
};

export const pendingManagerApproval = async (req, res) => {
  const { role } = req.userData;

  const { manager } = req.params;

  if (role !== 'manager') {
    errorResponse(res, statusCode.unauthorized, message.unauthorized);
  }

  try {
    const requestsPending = await showManagerPendingAppr(manager);

    const filteredRequests = requestsPending
      .filter((request) => request['user.department.line_manager'] !== null);
    const requestNumbers = filteredRequests.length;

    successResponseWithData(
      res,
      statusCode.success,
      message.managerApproval(requestNumbers),
      filteredRequests
    );
  } catch (err) {
    errorResponse(res, statusCode.serverError, err);
  }
};

export const getUserTravelStatus = async (req, res) => {
  const { role, id } = req.userData;

  if (role === 'manager') {
    return errorResponse(res, statusCode.unauthorized, message.unauthorized);
  }
  try {
    const data = await showUsertravelsStatus(id);
    return successResponseWithData(
      res,
      statusCode.success,
      message.userApproval,
      data
    );
  } catch (error) {
    errorResponse(res, statusCode.serverError, error);
  }
};

export const approveTravelRequest = async (req, res) => {
  try {
    const updatedTravel = await approveTravel(req.params.travel_id);

    successResponseWithData(
      res,
      statusCode.success,
      message.successfullyApproval(req.body.requesterName),
      updatedTravel[1][0]
    );
  } catch (err) {
    errorResponse(res, statusCode.serverError, err);
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
}

export const mostTravelledDest = async (req, res) => {
    try {
      const travelled = await mostTraveled();
      successResponseWithData(res, statusCode.success, message.oneWayTripCreated, travelled);
    } catch (error) {
      errorResponse(res, statusCode.serverError, error);
    }
};
