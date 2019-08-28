import models from '../database/models';

const { blacklist } = models;

export default {
    logoutService: async (token) => {
        try {
            return await blacklist.create({ expired_tokens: token })
        } catch (err) {
            throw err;
        }
    },
};
