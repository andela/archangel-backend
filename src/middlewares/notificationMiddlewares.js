import { errorResponse } from '../utils/response';
import { getANotificationService } from '../services/notificationServices';
import statusCode from '../utils/statusCode';
import message from '../utils/messageUtils';

export const verifyNotification = async (req, res, next) => {
  try {
    const { notification_id } = req.params;
    if (notification_id && notification_id.match(/\D/)) {
      return errorResponse(
        res,
        statusCode.badRequest,
        message.invalidNotificationId
      );
    }
    const notification = await getANotificationService(
      notification_id,
      req.userData.id
    );
    if (!notification) {
      return errorResponse(
        res,
        statusCode.notFound,
        message.notificationNotFound
      );
    }
    req.body.notification = notification;
    return next();
  } catch (err) {
    return errorResponse(res, statusCode.serverError, err);
  }
};

export const otherFunction = () => {};
