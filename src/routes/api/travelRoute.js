import { Router } from 'express';

import travelControllers from '../../controllers/travelControllers';
import travelValidator from '../../validation/travelValidation';
import dateValidator from '../../validation/dateValidator';
import authUtils from '../../middlewares/tokenMiddleware';

const route = Router();

const { createOneWayTrip, createReturnTrip } = travelControllers;
const { validateReturnTrip, validateTravelRequest, validateResult } = travelValidator;
const { departureDateValidator, futureDateValidator } = dateValidator;
const { getToken, verifyToken, verifyRequesterId } = authUtils;

// handles the api home route...
route.post('/onewaytrip', getToken, verifyToken, validateTravelRequest, validateResult, createOneWayTrip);

//This is the route that will handle the request to create a valid return trip for a user....
route.post('/travel/returntrip', getToken, verifyToken, verifyRequesterId, validateReturnTrip, validateResult,
            departureDateValidator, futureDateValidator, createReturnTrip);

export default route;
