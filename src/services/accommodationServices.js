/* eslint-disable no-useless-catch */
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import models from '../models';

const { accommodations } = models;

export const createAccommodation = async (accommodation) => {};

export const getAnAccommodation = async (id) => {
  try {
    return await accommodations.findOne({
      where: { id },
    });
  } catch (err) {
    throw err;
  }
};
