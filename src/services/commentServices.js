import 'core-js/stable';
import 'regenerator-runtime/runtime';

import models from '../database/models';

const { comments } = models;

export default {
	createComment: async (comment) => {
		try {
			return await comments.create(comment);
		} catch (err) {
			throw err;
		}
	},
	getComments: async (travel_id) => {
		try {
			return await comments.findAll({
				where: { travel_id },
			})
		} catch (err) {
			throw err;
		}
	},
};
