import { Router } from 'express';

import {
    createOneWayTrip,
    pendingManagerApproval,
    getUserTravelStatus,
    approveTravelRequest,
} from '../controllers/travelControllers';
import {
    validateTravelRequest,
    validateResult,
} from '../validation/travelValidation';
import { verifyDeptManagerAndRequestStatus } from '../middlewares/travelsMiddleware';
import { verifyRole } from '../middlewares/userMiddlewares';
import { getToken, verifyToken } from '../middlewares/tokenMiddleware';

const route = Router();


// handles the api home route...
route.post('/travel/one_way_trip', getToken, verifyToken, validateTravelRequest, validateResult, createOneWayTrip);

// handles manager pending req approvals route
route.get('/requests/pending/:manager', getToken, verifyToken, pendingManagerApproval);

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



export default route;
