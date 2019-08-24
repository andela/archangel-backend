import { compareSync } from 'bcrypt';
import models from '../database/models';

const { User } = models;


/**
*This function will get a user by email address...
*@param {String} email - the user's email
*@return {Promise} - response of sequelize
*/

export const findUserByEmail = (email) => User.findOne({ where: { email } });

/**
*This function will compare the password supplied by the user with the one in the database...
*@param {String} password - the user's password supplied
*@param {String} hashedPassword - the user's password in database
*@return {boolean} - response of bcrypt hashing
*/

export const comparePassword = (password, hashedPassword) => compareSync(password, hashedPassword);
