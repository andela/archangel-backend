import bcrypt from 'bcrypt-nodejs';
import models from '../database/models';

const { User } = models;


/**
 * Helper function to find a user by email
 * @param {String} email - user's email
 * @returns {Promise} - sequelize response
*/
export const queryByEmail = (email) => User.findOne({ where: { email } });

/**
 * Helper function to find a user by id
 * @param {String} id - user's id
 * @returns {Promise} - sequelize response
 */
export const queryById = (id) => User.findOne({ where: { id } });


/**
 * Helper function to update a user password
 * @param {String} hash  - user's password
 *  @param {String} id  - user's id
 * @returns {Promise} - sequelize response
 */
export const updatePassword = (hash, id) => User.update(hash, { where: { id } });
