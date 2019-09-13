import { Router } from 'express';

import travelControllers from '../controllers/travelControllers';
import travelValidator from '../validation/travelValidation';
import { departureDateValidator, futureDateValidator } from '../validation/dateValidator';
import { getToken, verifyToken } from '../middlewares/tokenMiddleware';

const route = Router();
const { createOneWayTrip, createReturnTrip, pendingManagerApproval, getUserTravelStatus } = travelControllers;
const { validateReturnTrip, validateTravelRequest, validateResult } = travelValidator;

// handles the api home route...
route.post('/travel/one_way_trip', getToken, verifyToken, validateTravelRequest, validateResult, createOneWayTrip);

// This is the route that will handle the request to create a valid return trip for a user....
route.post('/travel/return_trip', getToken, verifyToken, validateReturnTrip, validateResult,
            departureDateValidator, futureDateValidator, createReturnTrip);

// handles manager pending req approvals route
route.get('/requests/pending/:manager', getToken, verifyToken, pendingManagerApproval);

route.get('/user/status', getToken, verifyToken, getUserTravelStatus);


export default route;
