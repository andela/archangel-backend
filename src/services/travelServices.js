import 'core-js/stable';
import 'regenerator-runtime/runtime';

import models from '../database/models';

const { travel } = models;

export default {
	findTravelById: async (id) => {
		try {
			return await travel.findOne({
				attributes: ['id'],
				where: { id },
			});
		} catch (err) {
			throw err;
		}
	},
};
