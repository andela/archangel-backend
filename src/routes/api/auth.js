import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/api/v1/auth/login/facebook',
  passport.authenticate('facebook'));

router.get('/api/v1/auth/login/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/api/v1/auth/login',
    successRedirect: '/api/v1/requests',
  }));

router.get('/api/v1/requests', (req, res) => {
  return res.status(200).send({
    status: 'success',
    data: {
      first_name: req.user.displayName,
      email: req.user.emails[0].value,
    },
  });
});

router.get('/api/v1/auth/login/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/api/v1/auth/login/google/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/api/v1/auth/login',
    successRedirect: '/api/v1/requests',
  }));

router.get('/api/v1/requests', (req, res) => {
  return res.status(200).send({
    status: 'success',
    data: {
      name: req.user.displayName,
      email: req.user.emails[0].value,
    },
  });
});

export default router;
