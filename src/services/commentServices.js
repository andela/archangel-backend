/* eslint-disable no-useless-catch */
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import models from '../models';

const { comments } = models;

export const createComment = async (comment) => {
  try {
    return await comments.create(comment);
  } catch (err) {
    throw err;
  }
};

export const getAllComments = async (travel_id) => {
  try {
    return await comments.findAll({
      where: { travel_id },
    });
  } catch (err) {
    throw err;
  }
};

export const getAComment = async (comment_id) => {
  try {
    return await comments.findOne({
      where: { id: comment_id },
    });
  } catch (err) {
    throw err;
  }
};

export const destroyComment = async (comment_id) => {
  try {
    comments.destroy({
      where: { id: comment_id },
    });
  } catch (err) {
    throw err;
  }
};
