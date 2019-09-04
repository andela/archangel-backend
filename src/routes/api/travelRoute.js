import { Router } from 'express';

import travelControllers from '../../controllers/travelControllers';
import travelValidator from '../../validation/travelValidation';
import authUtils from '../../middlewares/tokenMiddleware';

const route = Router();
const { createOneWayTrip, reqPendingMgrApproval } = travelControllers;
const { validateTravelRequest, validateResult } = travelValidator;
const { getToken, verifyToken } = authUtils;

// handles the api home route...
route.post('/onewaytrip', getToken, verifyToken, validateTravelRequest, validateResult, createOneWayTrip);

// handles manager pending req approvals route
route.post('/requests/pending/:manager', getToken, verifyToken, reqPendingMgrApproval);

export default route;
