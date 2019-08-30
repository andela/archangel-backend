import 'core-js/stable';
import 'regenerator-runtime/runtime';
import models from '../database/models';

const { users,blacklist } = models;

export default {
    signupService: async (userObj) => {
        try {
            return await users.create(userObj);
        } catch (err) {
            throw err;
        }
    },
    findUserByEmail: async (email) => {
		try {
			return await users
				.findOne({
					where: { email },
				});
		} catch (err) {
			throw err;
		}
    },
    logoutService: async (token) => {
        try {
            return await blacklist.create({ expired_tokens: token })
        } catch (err) {
            throw err;
        }
    },
};
