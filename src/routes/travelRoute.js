import { Router } from 'express';

import travelControllers from '../controllers/travelControllers';
import travelValidator from '../validation/travelValidation';
import { getToken, verifyToken } from '../middlewares/tokenMiddleware';

const route = Router();
const { createOneWayTrip, pendingManagerApproval, getUserTravelStatus } = travelControllers;
const { validateTravelRequest, validateResult } = travelValidator;

// handles the api home route...
route.post('/onewaytrip', getToken, verifyToken, validateTravelRequest, validateResult, createOneWayTrip);

// handles manager pending req approvals route
route.get('/requests/pending/:manager', getToken, verifyToken, pendingManagerApproval);

route.get('/user/status', getToken, verifyToken, getUserTravelStatus);


export default route;
