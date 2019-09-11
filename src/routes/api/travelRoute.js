import { Router } from 'express';

import travelControllers from '../../controllers/travelControllers';
import travelValidator from '../../validation/travelValidation';
import { getToken, verifyToken } from '../../middlewares/tokenMiddleware';

const route = Router();
const { createOneWayTrip, pendingManagerApproval } = travelControllers;
const { validateTravelRequest, validateResult } = travelValidator;

// handles the api home route...
route.post('/onewaytrip', getToken, verifyToken, validateTravelRequest, validateResult, createOneWayTrip);

// handles manager pending req approvals route
route.get('/requests/pending/:manager', getToken, verifyToken, pendingManagerApproval);

export default route;
