import models from '../database/models';

const { departments } = models;


/**
 * Helper function to find a user by email
 * @param {String} email - line-manager's email
 * @returns {Promise} - sequelize response
 */
export const findManagerByEmail = async(email) => {
        try {
            return await departments.findOne({ where: { line_manager_email: email } });
        } catch (err) {
            throw err;
        }
    }
    /**
     * Helper function to find a user by id
     * @param {String} id - user's id
     * @returns {Promise} - sequelize response
     */
export const findDeptById = async(id) => {
    try {
        return await users.findOne({ where: { id } });
    } catch (err) {
        throw err
    }
}

/**
 * Helper function to update a user password
 * @param {String} hash  - user's password
 *  @param {String} id  - user's id
 * @returns {Promise} - sequelize response
 */
export const updatePassword = async(hash, id) => {
    try {
        return await users.update(hash, { where: { id } });
    } catch (err) {
        throw err
    }
}