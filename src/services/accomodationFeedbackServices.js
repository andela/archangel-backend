/* eslint-disable no-useless-catch */
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import models from '../models';

const { accommodation_feedbacks } = models;

export const createFeedback = async (comment) => {
  try {
    return await accommodation_feedbacks.create(comment);
  } catch (err) {
    throw err;
  }
};

export const getAllFeedbacks = async (accommodation_id) => {
  try {
    return await accommodation_feedbacks.findAll({
      where: { accommodation_id },
    });
  } catch (err) {
    throw err;
  }
};
