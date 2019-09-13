import { Router } from 'express';

import travelControllers from '../../controllers/travelControllers';
import travelValidator from '../../validation/travelValidation';
import { getToken, verifyToken } from '../../middlewares/tokenMiddleware';

const route = Router();
const { createOneWayTrip, pendingManagerApproval, userCanEditOpenRequests } = travelControllers;
const { validateTravelRequest, validateResult } = travelValidator;

// handles the api home route...
route.post('/travels/onewaytrip', getToken, verifyToken, validateTravelRequest, validateResult, createOneWayTrip);

// handles manager pending req approvals route
route.get('/travels/pending/:manager', getToken, verifyToken, pendingManagerApproval);

// handles editing of user's pending request
route.put('/travels/pending', getToken, verifyToken, userCanEditOpenRequests);

export default route;
