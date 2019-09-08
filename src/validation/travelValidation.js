import { check, validationResult } from 'express-validator';

import dateChecker from './dateValidator';
import response from '../utils/response';
import statusCode from '../utils/statusCode';
import message from '../utils/messageUtils';

const { currentDateValidator, futureDateValidator } = dateChecker;
const { errorResponse } = response;

const trip = 'return-trip';

export default {

  validateReturnTrip: [
    check('user_id')
        .custom((trip, {req}) => {
          const { body, userData} = req;
          if (body.hasOwnProperty('user_id')) {
            if (body.user_id != userData.id) {
              throw new Error(message.invalidUserId)
            }
          }
        }),
    check('travel_type')
        .not().isEmpty()
        .withMessage(message.emptyTravelType)
        .custom((trip, {req}) => {
          if (req.body.travel_type != trip) {
            throw new Error(message.invalidTravelType)
          }
        }),
    check('origin')
        .not().isEmpty()
        .withMessage(message.emptyOrigin)
        .isAlpha()
        .withMessage(message.lettersAlone),
    check('destination')
        .not().isEmpty()
        .withMessage(message.emptyDestination)
        .isAlpha()
        .withMessage(message.lettersAlone),
    check('departure_date')
        .not().isEmpty()
        .withMessage(message.emptyDepartureDate)
        .custom((trip, {req}) => currentDateValidator(req.body.departure_date)),
    check('return_date')
        .not().isEmpty()
        .withMessage(message.emptyReturnDate)
        .custom((trip, {req}) => futureDateValidator(req.body.return_date)),
    check('travel_purpose')
        .not().isEmpty()
        .withMessage(message.emptyTravelPurpose),
    check('accommodation_id')
        .not().isEmpty()
        .withMessage(message.emptyAccommodation)
        .isInt()
        .withMessage(message.isNotInteger)
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
  }
}
