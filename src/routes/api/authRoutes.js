import { Router } from 'express';

import authControllers from '../../controllers/authControllers';
import authValidator from '../../validation/authValidation';
import tokenMiddlewares from '../../middlewares/tokenMiddleware';
import { resetPasswordController } from '../../controllers';

const { sendPasswordResetEmail, receiveNewPassword } = resetPasswordController;


const route = Router();

const { login, logout, signup } = authControllers;
const { validateLogin, validateSignup, validateResult } = authValidator;
const  { getToken, verifyToken } = tokenMiddlewares;

// handles the api home route...
route.post('/auth/signup', validateSignup, validateResult, signup);

//handles the sign in request by email and password..
route.post('/auth/login', validateLogin, validateResult, login);

route.post("/auth/logout", getToken, verifyToken, logout);

route.post('/forgot',sendPasswordResetEmail);

route.post('/receive_new_password/:userId/:token',receiveNewPassword);

export default route;
