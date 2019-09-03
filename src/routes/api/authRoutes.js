import { Router } from 'express';
import passport from 'passport';

import authControllers from '../../controllers/authControllers';
import authValidator from '../../validation/authValidation';
import tokenMiddlewares from '../../middlewares/tokenMiddleware';

const route = Router();
const { signup, fbgooglesignup, login, logout} = authControllers;
const { validateLogin, validateSignup, validateResult } = authValidator;
const { getToken, verifyToken } = tokenMiddlewares;

// handles the api home route...
route.post('/auth/signup', validateSignup, validateResult, signup);

// handles the sign in request by email and password..
route.post('/auth/login', validateLogin, validateResult, login);

route.post('/auth/logout', getToken, verifyToken, logout);
// handles social media authentication
route.get('/auth/signup/facebook',
  passport.authenticate('facebook'));

route.get('/auth/signup/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/auth/signup',
    successRedirect: '/requests',
  }));

route.get('/auth/signup/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

route.get('/auth/signup/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/signup',
    successRedirect: '/requests',
  }));

  // route path subject to change
route.get('/requests', fbgooglesignup);

// handles the sign in request by email and password..
route.post('/auth/login', validateLogin, validateResult, login);

route.post('/auth/logout', getToken, verifyToken, logout);

export default route;
