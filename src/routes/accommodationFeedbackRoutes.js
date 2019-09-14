import { Router } from 'express';

import {
  createAccommodtionFeedback,
  getAccommodtionFeedbacks
} from '../controllers/accommodationFeedbackControllers';
import {
  validateFeedback,
  validateAccommodationId,
  validateResult,
} from '../validation/feedbackValidation';
import { confirmUserEmail } from '../middlewares/userMiddlewares';
import { getToken, verifyToken } from '../middlewares/tokenMiddleware';

const route = Router();

// handles the api home route...
route.post(
  '/accommodation/:accommodation_id/feedback',
  getToken,
  verifyToken,
  confirmUserEmail,
  validateFeedback,
  validateResult,
  createAccommodtionFeedback
);

route.get(
  '/accommodation/:accommodation_id/feedback',
  getToken,
  verifyToken,
  validateAccommodationId,
  validateResult,
  getAccommodtionFeedbacks
);

export default route;
