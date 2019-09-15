import { Router } from 'express';

import {
  approveTravelRequest,
  createOneWayTrip,
  createReturnTrip,
  getUserTravelStatus,
  mostTravelledDest,
  userCanEditOpenRequest,
  pendingManagerApproval
} from '../controllers/travelControllers';

import {
  validateReturnTrip,
  validateTravelRequest,
  validateResult,
} from '../validation/travelValidation';

import {
  departureDateValidator,
  futureDateValidator
} from '../validation/dateValidator';

import { verifyDeptManagerAndRequestStatus } from '../middlewares/travelsMiddleware';
import { verifyRole } from '../middlewares/userMiddlewares';
import { getToken, verifyToken } from '../middlewares/tokenMiddleware';

const route = Router();

// handles the api home route...
route.post('/travel/one_way_trip', getToken, verifyToken, validateTravelRequest, validateResult, createOneWayTrip);

// This is the route that will handle the request to create a valid return trip for a user....
route.post(
  '/travel/return_trip',
  getToken,
  verifyToken,
  validateReturnTrip,
  validateResult,
  departureDateValidator,
  futureDateValidator,
  createReturnTrip
);

// handles manager pending req approvals route
route.get('/travel/pending_request/:manager', getToken, verifyToken, pendingManagerApproval);

// user request status
route.get('/user/status', getToken, verifyToken, getUserTravelStatus);

route.patch(
  '/travel/approve_request/:travel_id',
  getToken,
  verifyToken,
  verifyRole('manager'),
  verifyDeptManagerAndRequestStatus,
  approveTravelRequest,
);
// Most travelled to destinations
route.get('/most', getToken, verifyToken, mostTravelledDest);

// handles editing of user's pending request
route.put(
  '/travel/update_request/:travel_id',
  getToken,
  verifyToken,
  validateTravelRequest,
  validateResult,
  userCanEditOpenRequest
);

export default route;
