import { Router } from 'express';

import authControllers from '../../controllers/authControllers';

const route = Router();
const { signup } = authControllers;

// handles the api home route...
route.post('/auth/signup', signup);

export default route;