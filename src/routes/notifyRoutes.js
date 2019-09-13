import { Router } from 'express';
// import { notifyControllers } from '../../controllers';
import ClientController from '../controllers/client';
// import tokenMiddleware from '../../middlewares/tokenMiddleware';


const router = Router();
const { getClient } = ClientController;
// const { getToken, verifyToken } = tokenMiddleware;

// api/v1/notification is already prepended to the request
// router.get('/notify', notificationController.getAllNotification);
// router.patch('/notify', notificationController.readAllNotification);


// router.use('/auth', auth);
router.get('/notify/:user_id', getClient);
// router.use('/onewaytrip', getToken, verifyToken);

router.use((err, req, res, next) => {
  if (err.name === 'Validation Error') {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce((errors, key) => {
        errors[key] = err.errors[key].message;
        return errors;
      }, {})
    });
  }
  return next(err);
});


export default router;
