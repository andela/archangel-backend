import { Router } from 'express';

import {
  addComment,
  getComments,
  deleteComment,
} from '../../controllers/commentControllers';
import {
  confirmUserEmail,
  verifyTravelOwner,
  verifyCommentOwner,
} from '../../middlewares/userMiddlewares';
import {
  validateComment,
  validateResult,
} from '../../validation/commentValidation';
import { getToken, verifyToken } from '../../middlewares/tokenMiddleware';

const route = Router();

// handles the api home route...
route.post(
  '/travel/:travel_id/comment',
  getToken,
  verifyToken,
  confirmUserEmail,
  validateComment,
  validateResult,
  verifyTravelOwner,
  addComment
);

route.get(
  '/travel/:travel_id/comment',
  getToken,
  verifyToken,
  verifyTravelOwner,
  getComments
);

route.delete(
  '/travel/comment/:comment_id',
  getToken,
  verifyToken,
  verifyCommentOwner,
  deleteComment
);

export default route;
