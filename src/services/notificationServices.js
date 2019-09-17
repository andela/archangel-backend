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
