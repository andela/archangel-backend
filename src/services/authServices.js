import models from '../database/models';

export default {
    signupService: async(userObj) => {
        try {
            return await models.user.create(userObj);
        } catch (err) {
            throw new err;
        }
    },
};