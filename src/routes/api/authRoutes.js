import { Router } from 'express';

import authControllers from '../../controllers/authControllers';
import authValidator from '../../validation/authValidation';

const route = Router();
const { signup } = authControllers;
const { validateSignup, validateResult } = authValidator;

// handles the api home route...
route.post('/auth/signup', validateSignup, validateResult, signup);

export default route;
