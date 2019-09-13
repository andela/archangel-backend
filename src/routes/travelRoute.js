import { Router } from 'express';

import travelControllers, {searchTravels} from '../controllers/travelControllers';
import { getToken, verifyToken } from '../middlewares/tokenMiddleware';
import travelValidator,{validateTravelSearch, validateTravelResult} from '../validation/travelValidation';


const route = Router();
const { createOneWayTrip, pendingManagerApproval, getUserTravelStatus } = travelControllers;
const { validateTravelRequest, validateResult } = travelValidator;

// handles the api home route...
route.post('/onewaytrip', getToken, verifyToken, validateTravelRequest, validateResult, createOneWayTrip);

// handles manager pending req approvals route
route.get('/requests/pending/:manager', getToken, verifyToken, pendingManagerApproval);
route.get('/search/travels',validateTravelSearch, validateTravelResult,searchTravels);

route.get('/user/status', getToken, verifyToken, getUserTravelStatus);


export default route;
