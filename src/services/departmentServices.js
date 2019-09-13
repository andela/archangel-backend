/* eslint-disable no-useless-catch */
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import models from '../models';

const { departments } = models;

export const createDepartment = async (comment) => {};

export const getADepartment = async (id) => {
  try {
    return await departments.findOne({
      where: { id },
    });
  } catch (err) {
    throw err;
  }
};
