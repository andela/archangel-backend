/* eslint-disable no-useless-catch */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import models from '../models';

const { travel_requests, departments, users } = models;

export default {
    oneWayTripService: async(travelObj) => {
        try {
            return await travels.create(travelObj);
        } catch (err) {
            throw err;
        }
    },
    findTravelById: async(id) => {
        try {
            return await travels.findOne({
                attributes: ['id'],
                where: { id },
            });
        } catch (err) {
            throw err;
        }
    },
};

export const showUsertravelsStatus = async (userId) => {
  try {
    return await travel_requests.findAll({
      where: {
        user_id: userId
      }
    });
  } catch (error) {
    throw error;
  }
};
