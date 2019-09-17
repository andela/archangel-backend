import { Router } from 'express';
import passport from 'passport';

import authControllers from '../controllers/authControllers';
import resetPassword from '../controllers/resetPassword';
import authValidator from '../validation/authValidation';
import { getToken, verifyToken } from '../middlewares/tokenMiddleware';

const { sendPasswordResetEmail, receiveNewPassword } = resetPassword;


const route = Router();
const {
  signup, fbgooglesignup, login, logout, getUserProfile, updateProfile,
  updateUserController
} = authControllers;
const { validateLogin, validateSignup, validateResult } = authValidator;

// handles user signup request...
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

// handles the user remember me patch request...
route.patch('/auth/remember_me', getToken, verifyToken, updateUserController);

// handles the sign in request by email and password..
route.post('/auth/login', validateLogin, validateResult, login);

route.post('/auth/logout', getToken, verifyToken, logout);


route.post('/forgot', sendPasswordResetEmail);

route.post('/receive_new_password/:userId/:token', receiveNewPassword);

route.get('/profile', getToken, verifyToken, getUserProfile);

route.put('/profile', getToken, verifyToken, updateProfile);

export default route;
