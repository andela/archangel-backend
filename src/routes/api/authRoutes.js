import express from 'express';

import auth from '../../controllers/authControllers';

const route = express.Router();
//   signup  = authControllers;

// handles the api home route...
route.post('/auth/signup', auth.signup);

export default route;