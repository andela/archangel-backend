import { Router } from 'express';

import travelControllers from '../../controllers/travelControllers';
import travelValidator from '../../validation/travelValidation';
import authUtils from '../../utils/authUtils';

const route = Router();
const { createOneWayTrip } = travelControllers;
const { validateTravelRequest, validateResult } = travelValidator;
const { verifyToken } = authUtils;

// handles the api home route...
route.post('/onewaytrip', verifyToken, validateTravelRequest, validateResult, createOneWayTrip);

export default route;
