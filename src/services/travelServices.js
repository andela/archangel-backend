import 'core-js/stable';
import 'regenerator-runtime/runtime';
import models from '../database/models';

const { travels, travel_request } = models;

export default {
	onewayTripService: async (travelObj) => {
		try {
			return await travels.create(travelObj);
		} catch (err) {
			throw err;
		}
	},

	findTravelById: async (id) => {
		try {
			return await travels.findOne({
				attributes: ['id'],
				where: { id },
			});
		} catch (err) {
			throw err;
		}
	},

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
	  }

};
