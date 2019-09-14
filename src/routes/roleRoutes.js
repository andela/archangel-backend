import { Router } from 'express';

import authValidator from '../validation/authValidation';
import roleController from '../controllers/roleControllers';
import { verifyRole } from '../middlewares/userMiddlewares';
import { getToken, verifyToken } from '../middlewares/tokenMiddleware';

const route = Router();
route.patch(
    '/role/assign_role/:user_id',
    getToken,
    verifyToken,
    verifyRole('super-admin'),
    roleController
);
