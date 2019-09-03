import { Router } from 'express';

import travelControllers from '../../controllers/travelControllers';
import travelValidator from '../../validation/travelValidation';
import authUtils from '../../middlewares/tokenMiddleware';

const route = Router();
const { createOneWayTrip } = travelControllers;
const { validateTravelRequest, validateResult, getDestinationCount } = travelValidator;
const { getToken, verifyToken } = authUtils;

// handles the api home route...
route.post('/onewaytrip', getToken, verifyToken, validateTravelRequest, validateResult, getDestinationCount, createOneWayTrip);

export default route;
