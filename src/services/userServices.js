import models from '../database/models';

const { users } = models;


/**
 * Helper function to find a user by email
 * @param {String} email - user's email
 * @returns {Promise} - sequelize response
*/
export const queryByEmail = (email) => users.findOne({ where: { email } });

/**
 * Helper function to find a user by id
 * @param {String} id - user's id
 * @returns {Promise} - sequelize response
 */
export const queryById = (id) => users.findOne({ where: { id } });


/**
 * Helper function to update a user password
 * @param {String} hash  - user's password
 *  @param {String} id  - user's id
 * @returns {Promise} - sequelize response
 */
export const updatePassword = (hash, id) => users.update(hash, { where: { id } });
