/* eslint-disable no-else-return */
import pusher from '../config/pusher';
import {
  createTripService,
  showManagerPendingAppr,
  showUsertravelsStatus,
  approveTravel,
  mostTraveled,
  editOpenRequests,
  checkApprovalStatus
} from '../services/travelServices';
import { findUserByEmail } from '../services/authServices';
import { successResponseWithData, errorResponse } from '../utils/response';
import message from '../utils/messageUtils';
import statusCode from '../utils/statusCode';
import { createNotification } from '../services/notificationServices';
import { findUserAndDepartment } from '../services/authServices';

const createOneWayTrip = async (req, res) => {
  try {
    const user = await findUserByEmail(req.userData.email);
    const { id, dept_id } = user.dataValues;

    const data = await createTripService({
      user_id: id,
      travel_type: 'one-way',
      ...req.body,
      multi_city: req.destinationCount,
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

const createReturnTrip = async (req, res) => {
  try {
    const user = await findUserByEmail(req.userData.email);
    const { id, dept_id } = user.dataValues;

    const travelRequestData = {
      user_id: id,
      dept_id,
      ...req.body
    };

    const createdReturnTripData = await createTripService(travelRequestData);

    successResponseWithData(
      res,
      statusCode.created,
      message.returnTripCreated,
      createdReturnTripData.dataValues
    );
  } catch (err) {
    errorResponse(res, err.statusCode || statusCode.serverError, err);
  }
};

const pendingManagerApproval = async (req, res) => {
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

const getUserTravelStatus = async (req, res) => {
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

const approveTravelRequest = async (req, res) => {
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
  }
};

const userCanEditOpenRequest = async (req, res) => {
  const { travel_id } = req.params;

  const userId = req.userData.id;

  try {
    const result = await checkApprovalStatus(travel_id, userId);

    if (result[0].approval_status !== 'pending') {
      errorResponse(res, statusCode.badRequest, message.requestNotOpen);
    }

    const updatedRequest = await editOpenRequests(req.body, userId, travel_id);
    const editedRequestData = updatedRequest[1][0];
    const { id } = editedRequestData;

    // Get the user together with the department data of that user..
    const userManageData = await findUserAndDepartment(userId);
    const { manager_user_id } = userManageData.dataValues.department.dataValues;

    const editedRequestNotification = await createNotification({
      recipient_id: manager_user_id,
      travel_id: id,
      message: message.editedTravelRequest(id)
    });
    const editedRequestMessage = editedRequestNotification.dataValues;

    pusher.trigger(
      'notifications',
      `edited-travel-request-${userId}`,
      {
        message: message.editedTravelRequest(id),
        editedRequestMessage
      },
      req.headers['x-socket-id']
    );

    successResponseWithData(res, statusCode.success, message.requestUpdated, editedRequestData);
  } catch (err) {
    errorResponse(res, statusCode.serverError, err);
  }
};

const mostTravelledDest = async (req, res) => {
  try {
    const travelled = await mostTraveled();
    successResponseWithData(res, statusCode.success, message.oneWayTripCreated, travelled);
  } catch (error) {
    errorResponse(res, statusCode.serverError, error);
  }
};

// const userManager = async (req, res) =>{
//   try {
//     const userId = req.userData.id;
//     const userManageData = await findUserAndDepartment(userId);
//     userManageData.dataValues.department.dataValues;
//     successResponseWithData(res, statusCode.success, message.oneWayTripCreated, userManageData);
//   } catch (err) {
//     errorResponse(res, statusCode.serverError, err)
//   }
// }

export {
  createOneWayTrip,
  createReturnTrip,
  pendingManagerApproval,
  getUserTravelStatus,
  approveTravelRequest,
  userCanEditOpenRequest,
  mostTravelledDest
};
