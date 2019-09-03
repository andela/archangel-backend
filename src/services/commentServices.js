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
};
