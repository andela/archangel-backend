import {
  createTripService,
  showManagerPendingAppr,
  showUsertravelsStatus,
  approveTravel,
  mostTraveled,
  editOpenRequests,
  checkApprovalStatus,
  getUserTravelsStats
} from '../services/travelServices';
import { isDateValid } from '../utils/dateUtils';

import { findUserByEmail } from '../services/authServices';
import { successResponseWithData, errorResponse } from '../utils/response';
import message from '../utils/messageUtils';
import statusCode from '../utils/statusCode';
import { createNotification } from '../services/notificationServices';
import pusher from '../config/pusher';
import { getADepartment } from '../services/departmentServices';



const createOneWayTrip = async(req, res) => {
  try {
    const { first_name, email } = req.userData;
    const user = await findUserByEmail(email);
    const { id, dept_id } = user.dataValues;

    const data = await createTripService({
      user_id: id,
      travel_type: 'one-way',
      ...req.body,
      dept_id,
    });

    const dept = await getADepartment(dept_id);
    
    const notificationObj = await createNotification({
      recipient_id: dept.manager_user_id,
      travel_id: data.dataValues.id,
      message: message.notificationTravelMessage(
        first_name, data.dataValues.origin
      )
    });
    const notificationMessage = notificationObj.dataValues;

    console.log(notificationMessage);

    delete notificationMessage.recipient_id;
    notificationMessage.title = 'New Travel Request.';
    console.log(`new-travel-${dept.manager_user_id}`)
    pusher.trigger(
      'notifications',
      `new-travel-${dept.manager_user_id}`,
      notificationMessage,
      req.headers['x-socket-id']
    );

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

const createReturnTrip = async(req, res) => {
  try {
    const { first_name, email } = req.userData;
    const user = await findUserByEmail(email);
    const { id, dept_id } = user.dataValues;

    const travelRequestData = {
      user_id: id,
      dept_id,
      ...req.body
    };

    const dept = await getADepartment(dept_id);

    const createdReturnTripData = await createTripService(travelRequestData);

    const notificationObj = await createNotification({
      recipient_id: dept.manager_user_id,
      travel_id: data.dataValues.id,
      message: message.notificationReturnMessage(
        first_name, data.dataValues.origin
      )
    });
    const notificationMessage = notificationObj.dataValues;
    
    console.log(notificationMessage);

    delete notificationMessage.recipient_id;
    notificationMessage.title = 'New Travel Request.';

    pusher.trigger(
      'notifications',
      `return-travel-${dept.manager_user_id}`,
      notificationMessage,
      req.headers['x-socket-id']
    );

    successResponseWithData(
      res,
      statusCode.created,
      message.returnTripCreated,
      createdReturnTripData
    );
  } catch (err) {
      errorResponse(res, err.statusCode || statusCode.serverError, err);
  }
};

const pendingManagerApproval = async(req, res) => {
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

const getUserTravelStatus = async(req, res) => {
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

const approveTravelRequest = async(req, res) => {
  try {
    const updatedTravelObj = await approveTravel(req.params.travel_id);
    const updatedTravel = updatedTravelObj[1][0];

    const notificationObj = await createNotification({
      recipient_id: updatedTravel.user_id,
      travel_id: updatedTravel.id,
      message: message.notificationMessage(
        updatedTravel.createdAt,
        updatedTravel.origin,
      )
    });
    const notificationMessage = notificationObj.dataValues;

    delete notificationMessage.recipient_id;
    notificationMessage.title = 'Approved Travel Request.';

    pusher.trigger(
      'notifications',
      `approved-travel-${updatedTravel.user_id}`,
      notificationMessage,
      req.headers['x-socket-id']
    );
    successResponseWithData(
      res,
      statusCode.success,
      message.successfullyApproval(req.body.requesterName),
      updatedTravel
    );
  } catch (err) {
      errorResponse(res, statusCode.serverError, err);
  }
};

const userCanEditOpenRequest = async(req, res) => {
  const { travel_id } = req.params;

  const userId = req.userData.id;

  try {
    const result = await checkApprovalStatus(travel_id, userId);

    if (result[0].approval_status !== 'pending') {
      errorResponse(res, statusCode.badRequest, message.requestNotOpen);
    }

    const updatedRequest = await editOpenRequests(req.body, userId, travel_id);

    successResponseWithData(res, statusCode.success, message.requestUpdated, updatedRequest[1][0]);
  } catch (err) {
      errorResponse(res, statusCode.serverError, err);
  }
};

const mostTravelledDest = async(req, res) => {
  try {
    const travelled = await mostTraveled();
    successResponseWithData(res, statusCode.success, message.oneWayTripCreated, travelled);
  } catch (error) {
      errorResponse(res, statusCode.serverError, error);
  }
};

const countTravelsByStats = async(req, res) => {
  const { start_date, end_date } = req.query;
  const userId = req.userData.id;
  try {
    const travelCount = await getUserTravelsStats(userId, start_date, end_date);
    successResponseWithData(
      res, statusCode.success,
      message.travelByTimeFrame,
      travelCount[0]);
  } catch (error) {
      errorResponse(res, statusCode.serverError, error);
  }
};

export {
  createOneWayTrip,
  createReturnTrip,
  pendingManagerApproval,
  getUserTravelStatus,
  approveTravelRequest,
  userCanEditOpenRequest,
  mostTravelledDest,
  countTravelsByStats
};
