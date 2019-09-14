import models from '../models';

const { users } = models;


/**
 * Helper function to find a user by email
 * @param {String} email - user's email
 * @returns {Promise} - sequelize response
 */
const roleUpdate = async(email, role) => {
    try {
        return await users.findOne({ where: { email, role } });
    } catch (err) {
        throw err;
    }
}
export default {
    roleUpdate
}
