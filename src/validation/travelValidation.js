import { check, validationResult } from 'express-validator';

import { errorResponse } from '../utils/response';
import statusCode from '../utils/statusCode';
import message from '../utils/messageUtils';

export const validateTravelRequest = [
  check('origin')
    .not()
    .isEmpty()
    .withMessage(message.emptyOrigin)
    .isAlpha()
    .withMessage(message.lettersAlone),
  check('destination')
    .not()
    .isEmpty()
    .withMessage(message.emptyDestination)
    .isAlpha()
    .withMessage(message.lettersAlone),
  check('departure_date')
    .not()
    .isEmpty()
    .withMessage(message.emptyDepartureDate),
  check('travel_purpose')
    .not()
    .isEmpty()
    .withMessage(message.emptyTravelPurpose),
];

export const validateReturnTrip = [
    check('travel_type')
      .not()
      .isEmpty()
      .withMessage(message.emptyTravelType)
      .not()
      .custom(value => {
        if (value !== 'return') {
          throw new Error(message.invalidTravelType);
        }
      }),
    check('origin')
      .not()
      .isEmpty()
      .withMessage(message.emptyOrigin)
      .isAlpha()
      .withMessage(message.lettersAlone),
    check('destination')
      .not()
      .isEmpty()
      .withMessage(message.emptyDestination)
      .isAlpha()
      .withMessage(message.lettersAlone),
    check('departure_date')
      .not()
      .isEmpty()
      .withMessage(message.emptyDepartureDate)
      .isISO8601()
      .withMessage(message.isNotISODate)
      .bail(),
    check('return_date')
      .not()
      .isEmpty()
      .withMessage(message.emptyReturnDate)
      .isISO8601()
      .withMessage(message.isNotISODate)
      .bail(),
    check('travel_purpose')
      .not()
      .isEmpty()
      .withMessage(message.emptyTravelPurpose),
    check('accommodation_id')
      .not()
      .isEmpty()
      .withMessage(message.emptyAccommodation)
      .isInt()
      .withMessage(message.isNotInteger)
  ];

export const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = [];
    errors.array().forEach((err) => {
      error.push(err.msg);
    });
    return errorResponse(res, statusCode.badRequest, error);
  }
  return next();
};
