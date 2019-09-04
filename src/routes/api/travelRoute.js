import { Router } from 'express';

import travelControllers from '../../controllers/travelControllers';
import travelValidator from '../../validation/travelValidation';
import authUtils from '../../middlewares/tokenMiddleware';

const route = Router();
const { createReturnTrip } = travelControllers;
const { validateReturnTrip, validateResult } = travelValidator;
const { getToken, verifyToken } = authUtils;

//This is the route that will handle the request to create a valid return trip for a user....
route.post('/travel/returntrip', getToken, verifyToken, validateReturnTrip, validateResult, createReturnTrip);

export default route;
