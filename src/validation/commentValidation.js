import { check, validationResult } from 'express-validator';

import authServices from '../services/authServices';
import travelServices from '../services/travelServices';

import response from '../utils/response';
import statusCode from '../utils/statusCode';
import message from '../utils/messageUtils';

const { errorResponse } = response;

const { findUserByEmail } = authServices;
const { findTravelById } = travelServices;


export default {
    validateComment: [
        check('email')
            .not().isEmpty()
            .withMessage(message.emptyEmail)
            .isEmail()
            .withMessage(message.invalidEmail)
            .custom((email) => findUserByEmail(email)
            .then((user) => {
                if (!user) {
                    throw new Error(message.unregisteredEmail(email));
                }
            })),
        check('travel_id')
            .isNumeric({ no_symbols: true })
            .withMessage(message.invalidTravel)
            .custom((id) => findTravelById(id)
            .then((travel) => {
                if (!travel) {
                    throw new Error(message.nonExistentTravel);
                }
            })),
        check('comment')
            .not().isEmpty()
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
