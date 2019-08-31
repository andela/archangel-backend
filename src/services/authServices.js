import 'core-js/stable';
import 'regenerator-runtime/runtime';
import models from '../database/models';

const { users, blacklists } = models;

export default {
    signupService: async (userObj) => {
        try {
            return await users.create(userObj);
        } catch (err) {
            throw err;
        }
    },
    // subject to changes
    findUserById: async(userId) => {
        try {
            return await users.findAll({
                where: {
                  id : userId
                },
            });
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
            return await blacklists.create({ expired_tokens: token })
        } catch (err) {
            throw err;
        }
    },
};
