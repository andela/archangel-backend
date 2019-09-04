import { Router } from 'express';

import notifyControllers from '../../controllers/notifyControllers';
import notifyValidator from '../../validation/notifyValidation';
import authUtils from '../../middlewares/tokenMiddleware';