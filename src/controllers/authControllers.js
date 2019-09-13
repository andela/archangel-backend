/* eslint-disable max-len */
import ApiErrors from '../utils/ApiErrors';
// import sendVerificationEmail from '../utils/email';

import {
  comparePassword,
  findUserByEmail,
  logoutService,
  signupService,
  getUserProfileService
} from '../services/authServices';
import {
  successResponseWithData,
  successResponse,
  errorResponse,
} from '../utils/response';
import { generateToken } from '../middlewares/tokenMiddleware';
import message from '../utils/messageUtils';
import statusCode from '../utils/statusCode';
import { usePasswordHashToMakeToken } from '../modules/email';

import models from '../models';

const { users } = models;

export default {
  signup: async (req, res) => {
    try {
      const {
        first_name, last_name, email, password,
      } = req.body;

      const userObj = {
        first_name,
        last_name,
        email,
        password,
      };

      userObj.role = req.body.role || 'requester';

      const user = await signupService(userObj);
      // eslint-disable-next-line no-unused-vars
      // const emailVerify = await sendVerificationEmail(user.dataValues.email);
      const data = user.dataValues;

      data.token = generateToken(data.id, email, data.role, first_name);
      delete data.password;
      successResponseWithData(
        res,
        statusCode.created,
        message.signupSuccess(req.email),
        data
      );
    } catch (err) {
      errorResponse(res, err.statusCode || statusCode.serverError, err);
    }
  },

  fbgooglesignup: async (req, res) => {
    try {
      const {
        // eslint-disable-next-line no-unused-vars
        first_name,
        last_name,
        email,
        role,
      } = req.user;

      const data = {
        first_name,
        last_name,
        email,
        role,
      };

      successResponseWithData(
        res,
        statusCode.created,
        message.signupSuccess(email),
        data
      );
    } catch (err) {
      errorResponse(res, statusCode.serverError, err);
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const validUser = await findUserByEmail(email);
      if (validUser === null || validUser === undefined) {
        throw new ApiErrors(
          message.userEmailNotFound(email),
          statusCode.notFound
        );
      }
      const { password: hashedPassword, ...data } = validUser.dataValues;
      const validPassword = await comparePassword(password, hashedPassword);
      if (!validPassword) {
        throw new ApiErrors(message.incorrectPassword, statusCode.badRequest);
      } else {
        const token = generateToken(data.id, email, data.role, data.first_name);
        return successResponseWithData(
          res,
          statusCode.success,
          message.loginSuccess,
          { ...data, token }
        );
      }
    } catch (err) {
      errorResponse(res, err.statusCode || statusCode.serverError, err);
    }
  },

  logout: async (req, res) => {
    try {
      const { token } = req;
      await logoutService(token);
      successResponse(res, statusCode.success, message.logoutSuccess);
    } catch (err) {
      errorResponse(res, statusCode.serverError, err.message);
    }
  },

  getUserProfile: async (req, res) => {
    try {
      const { id } = req.userData;
      const userProfile = await getUserProfileService(id);
      successResponseWithData(res, statusCode.success, message.profilefetched, userProfile);
    } catch (err) {
      errorResponse(res, statusCode.serverError, err.message);
    }
  },

  updateProfile: async (req, res) => {
    let result;
    try {
      const { id } = req.userData;
      const {
        first_name, last_name, dob, gender, address, preferred_lang, preferred_currency
      } = req.body;
      result = await users.findOne({ where: { id }, });

      const options = {
        returning: true,
        where: { id }
      };
      const newProfile = await users.update({
        first_name: first_name || result.dataValues.first_name,
        last_name: last_name || result.dataValues.last_name,
        dob: dob || result.dataValues.dob,
        gender: gender || result.dataValues.gender,
        address: address || result.dataValues.address,
        preferred_lang: preferred_lang || result.dataValues.preferred_lang,
        preferred_currency: preferred_currency || result.dataValues.preferred_currency
      }, options);
      successResponseWithData(res, statusCode.success, message.profileUpdated, newProfile);
    } catch (err) {
      errorResponse(res, statusCode.serverError, err.message);
    }
  }
};
