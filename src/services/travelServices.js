import 'core-js/stable';
import 'regenerator-runtime/runtime';
import models from '../database/models';

const { travel_request } = models;

export default {

  /**
  *This function will create a new return trip in the database...
  *@param {Object} travelRequest - the data of the travel request the user is making..
  *@return {Object} - response of sequelize after creating the request.
  */

  returnTripService: async (travelRequest) => {
    try {
      return await travel_request.create(travelRequest)
    } catch (err) {
      throw err;
    }
  },
}
