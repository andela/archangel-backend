import { check, validationResult } from 'express-validator';

import { findTravelById } from '../services/travelServices';
import { errorResponse } from '../utils/response';

import statusCode from '../utils/statusCode';
import message from '../utils/messageUtils';

export const validateComment = [
  check('travel_id')
    .isNumeric({ no_symbols: true })
    .withMessage(message.invalidTravelId)
    .custom((id) => findTravelById(id).then((travel) => {
      if (!travel) {
        throw new Error(message.travelNotFound);
      }
    })),
  check('comment')
    .isLength({ min: 1 })
    .withMessage(message.emptyComment),
];

export const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, statusCode.badRequest, errors.array()[0].msg);
  }
  return next();
};
