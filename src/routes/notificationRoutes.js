import { Router } from 'express';

import {
  getAllNotifications,
  getANotification,
} from '../controllers/notificationControllers';
import { confirmUserEmail } from '../middlewares/userMiddlewares';
import { getToken, verifyToken } from '../middlewares/tokenMiddleware';
import { verifyNotification } from '../middlewares/notificationMiddlewares';

const route = Router();

// handles the api home route...
route.get(
  '/notification',
  getToken,
  verifyToken,
  confirmUserEmail,
  getAllNotifications,
);

route.get(
  '/notification/:notification_id',
  getToken,
  verifyToken,
  verifyNotification,
  getANotification,
);

export default route;
