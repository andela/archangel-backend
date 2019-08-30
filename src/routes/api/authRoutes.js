import { Router } from 'express';
import passport from 'passport';

import authControllers from '../../controllers/authControllers';
import authValidator from '../../validation/authValidation';

const route = Router();
const { signup, fbgooglesignup } = authControllers;
const { validateSignup, validateResult } = authValidator;

// handles the api home route...
route.post('/auth/signup', validateSignup, validateResult, signup);

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

export default route;
