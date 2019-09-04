import 'core-js/stable';
import 'regenerator-runtime/runtime';

import models from '../database/models';

const { travels } = models;

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
};
