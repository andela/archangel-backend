import "core-js/stable";
import "regenerator-runtime/runtime";
import models from '../database/models';

const { users } = models;

export default {
    signupService: async(userObj) => {
        try {
            return await users.create(userObj);
        } catch (err) {

            throw err;
        }
    },
};