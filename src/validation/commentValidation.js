import { check, validationResult } from 'express-validator';

import travelServices from '../services/travelServices';

import response from '../utils/response';
import statusCode from '../utils/statusCode';
import message from '../utils/messageUtils';

const { errorResponse } = response;
const { findTravelById } = travelServices;

export default {
	validateComment: [
		check('travel_id')
			.isNumeric({ no_symbols: true })
			.withMessage(message.invalidTravelId)
			.custom((id) => findTravelById(id).then((travel) => {
					if (!travel) {
						throw new Error(message.nonExistentTravel);
					}
				})),
		check('comment')
			.isLength({ min: 1 })
			.withMessage(message.emptyComment),
	],
	validateResult: (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return errorResponse(res, statusCode.badRequest, errors.array()[0].msg);
		}
		return next();
	},
};
