import { check, validationResult } from 'express-validator';

import { getAnAccommodation } from '../services/accommodationServices';
import { errorResponse } from '../utils/response';

import statusCode from '../utils/statusCode';
import message from '../utils/messageUtils';

let accommodationName;

const checkAccommodationId = check('accommodation_id')
  .isNumeric({ no_symbols: true })
  .withMessage(message.invalidAccommodationId)
  .custom((id) => getAnAccommodation(id).then((accommodation) => {
    if (!accommodation) {
      throw new Error(message.accommodationNotFound);
    }
    accommodationName = accommodation.dataValues.accommodation_name;
  }));
const checkFeedbackField = check('feedback')
  .isLength({ min: 1 })
  .withMessage(message.emptyFeedback);

export const validateFeedback = [
  checkAccommodationId,
  checkFeedbackField
];

export const validateAccommodationId = [
  checkAccommodationId,
];

export const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, statusCode.badRequest, errors.array()[0].msg);
  }
  req.body.accommodation_name = accommodationName;
  return next();
};
