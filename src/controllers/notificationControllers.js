import { getAllNotificationsService } from '../services/notificationServices';
import { successResponseWithData, errorResponse } from '../utils/response';

import message from '../utils/messageUtils';
import statusCode from '../utils/statusCode';

export const getANotification = (req, res) => {
  successResponseWithData(
    res,
    statusCode.success,
    message.getANotification,
    req.body.notification
  );
};

export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await getAllNotificationsService(req.userData.id);

    successResponseWithData(
      res,
      statusCode.success,
      message.getAllNotification,
      notifications
    );
  } catch (err) {
    errorResponse(res, statusCode.serverError, err);
  }
};
