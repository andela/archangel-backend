import { check, validationResult } from 'express-validator';

import { findUserByEmail } from '../services/authServices';
import { errorResponse } from '../utils/response';
import statusCode from '../utils/statusCode';
import message from '../utils/messageUtils';

export default {
  validateSignup: [
    check('email')
      .not()
      .isEmpty()
      .withMessage(message.noEmail)
      .isEmail()
      .withMessage(message.invalidEmail)
      .custom((email) => findUserByEmail(email).then((user) => {
        if (user) {
          throw new Error(message.usedEmail(email));
        }
      })),
    check('password')
      .isLength({ min: 8 })
      .withMessage(message.shortPassword)
      .matches(/\d/)
      .withMessage(message.noDigitInPassword),
    check('first_name')
      .not()
      .isEmpty()
      .withMessage(message.emptyFirstname),
    check('last_name')
      .not()
      .isEmpty()
      .withMessage(message.emptyLastname),
  ],

  validateLogin: [
    check('email')
      .isEmail()
      .withMessage(message.invalidEmail),

    check('password')
      .isLength({ min: 8 })
      .withMessage(message.shortPassword)
      .matches(/\d/)
      .withMessage(message.noDigitInPassword),
  ],

  validateResult: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = [];
      errors.array().forEach((err) => {
        error.push(err.msg);
      });
      return errorResponse(res, statusCode.badRequest, error);
    }
    return next();
  },
};
