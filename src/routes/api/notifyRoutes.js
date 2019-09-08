import express from 'express';

import notifyControllers from '../../controllers/notifyControllers';
import authUtils from '../../middlewares/tokenMiddleware';


const notifyRoutes = express.Router();

const { verifyToken } = authUtils;

const trip = (io) => {
    const notify = new notifyControllers(io);
    const { createNewTravel, getManagerTravel } = notify;

    // Getting the email
    notifyRoutes.post('/create_travels', verifyToken, createNewTravel);
    notifyRoutes.get('/get_travels/:id', getManagerTravel);

    return notifyRoutes;
};

export default trip;
