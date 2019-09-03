import { check, validationResult } from 'express-validator';


import response from '../utils/response';
import statusCode from '../utils/statusCode';
import message from '../utils/messageUtils';

const { errorResponse } = response;

export default {
    validateTravelRequest: [
        check('origin').not().isEmpty()
            .withMessage(message.emptyOrigin)
            .isAlpha()
            .withMessage(message.lettersAlone),
        check('destination').not().isEmpty()
        .withMessage(message.emptyDestination)
        .isAlpha()
        .withMessage(message.lettersAlone),
        check('departure_date').not().isEmpty().withMessage(message.emptyDepartureDate),
        check('travel_purpose').not().isEmpty().withMessage(message.emptyTravelPurpose),
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
