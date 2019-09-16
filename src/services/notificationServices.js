/* eslint-disable no-useless-catch */
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import models from '../models';

const { notifications } = models;

export const createNotification = async (notification) => {
  try {
    return await notifications.create(notification);
  } catch (err) {
    throw err;
  }
};

export const getAllNotificationsService = async (recipient_id) => {
  try {
    return await notifications.findAll({
      where: { recipient_id },
    });
  } catch (err) {
    throw err;
  }
};

export const getANotificationService = async (id, recipient_id) => {
  try {
    return await notifications.findOne({
      where: { id, recipient_id },
    });
  } catch (err) {
    throw err;
  }
};
