/* eslint-disable no-useless-catch */
import models from '../models';

const { users } = models;


/**
 * Helper function to find a user by email
 * @param {String} email - user's email
 * @returns {Promise} - sequelize response
*/
const queryByEmail = async (email) => {
  try {
    return await users.findOne({ where: { email } });
  } catch (err) {
    throw err;
  }
};
/**
 * Helper function to find a user by id
 * @param {String} id - user's id
 * @returns {Promise} - sequelize response
 */
const queryById = async (id) => {
  try {
    return await users.findOne({ where: { id } });
  } catch (err) {
    throw err;
  }
};

/**
 * Helper function to update a user password
 * @param {String} hash  - user's password
 *  @param {String} id  - user's id
 * @returns {Promise} - sequelize response
 */
const updatePassword = async (hash, id) => {
  try {
    return await users.update(hash, { where: { id } });
  } catch (err) {
    throw err;
  }
};

export default {
  queryByEmail,
  queryById,
  updatePassword
};
