import { check, validationResult } from 'express-validator';

import Users from '../database/models/users';
import ApiError from '../utils/ApiError';

export default {
	validateSignup: () => {
		check('email')
			.isEmail()
			.withMessage('Invalid e-mail address.')
			.custom((email) => Users.findUserByEmail(email).then((user) => {
				if (user) {
					throw new ApiError(400, 'E-mail already in use.');
				}
			}));
		check('password')
			.isLength({ min: 8 })
			.withMessage('Password length must be 8 or more.')
			.matches('/d/')
			.withMessage('password must contain at least a digit.');
		check('firstname')
			.not()
			.isEmpty()
			.withMessage("first name can't be empty.");
		check('lastname')
			.not()
			.isEmpty()
			.withMessage("last name can't be empty.");
	},
	signupValidationResult: (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400)
			.send({
				error: errors.array(),
			});
		}
		next();
	},
};
