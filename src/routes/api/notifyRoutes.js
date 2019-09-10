import { Router } from 'express';
import { NotificationController } from '../../controllers';
import profileController from '../../controllers/profile';
import tokenMiddleware from '../../middlewares/tokenMiddleware';


const router = Router();
const { getProfile } = profileController;
const { getToken, verifyToken } = tokenMiddleware;

// api/v1/notification is already prepended to the request
router.get('/notify', NotificationController.getAllNotification);
router.patch('/notify', NotificationController.readAllNotification);


export const foo = (io = null) => {
    router.use('/auth', auth);
    router.get('/profile/:user_id', getProfile);
    router.use('/onewaytrip', getToken, verifyToken, travelRoute(io));

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
    return router;
};


export default trip;
