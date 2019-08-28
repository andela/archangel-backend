import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/api/auth/login/facebook',
  passport.authenticate('facebook'));

router.get('/api/auth/login/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/api/auth/login',
    successRedirect: '/api/requests',
  }));

router.get('/api/requests', (req, res) => {
  return res.status(200).send({
    status: 'success',
    data: {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      id: req.user.id,
    },
  });
});

router.get('/api/auth/login/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/api/auth/login/google/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/api/auth/login',
    successRedirect: '/api/requests',
  }));

router.get('/api/requests', (req, res) => {
  return res.status(200).send({
    status: 'success',
    data: {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      id: req.user.id,
    },
  });
});

export default router;
