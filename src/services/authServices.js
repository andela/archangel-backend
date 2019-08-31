import { compareSync } from 'bcrypt';
import 'core-js/stable';
import 'regenerator-runtime/runtime';0
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

    /**
    *This function will get a user by email address...
    *@param {String} email - the user's email
    *@return {Promise} - response of sequelize
    */
    findUserByEmail: (email) => users.findOne({ where: { email } }),

    /**
    *This function will compare the password supplied by the user with the one in the database...
    *@param {String} password - the user's password supplied
    *@param {String} hashedPassword - the user's password in database
    *@return {boolean} - response of bcrypt hashing
    */
    comparePassword: (password, hashedPassword) => compareSync(password, hashedPassword),

    logoutService: async (token) => {
        try {
            return await blacklists.create({ expired_tokens: token })
        } catch (err) {
            throw err;
        }
    }
    
};
