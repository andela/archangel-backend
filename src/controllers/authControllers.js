import dotenv from 'dotenv';
import ApiErrors from '../utils/ApiErrors';
import sendVerificationEmail from '../utils/email';

import {
    comparePassword,
    findUserByEmail,
    logoutService,
    signupService,
} from '../services/authServices';
import {
    successResponseWithData,
    successResponse,
    errorResponse,
} from '../utils/response';
import { generateToken } from '../middlewares/tokenMiddleware';
import message from '../utils/messageUtils';
import statusCode from '../utils/statusCode';

export default {
    signup: async(req, res) => {
            try {
                const {
                    first_name,
                    last_name,
                    email,
                    password,
                } = req.body;

                const userObj = {
                    first_name,
                    last_name,
                    email,
                    password,
                };

                export default {
                    signup: async(req, res) => {
                        try {
                            const {
                                first_name,
                                last_name,
                                email,
                                password
                            } = req.body;
                            const userObj = {
                                first_name,
                                last_name,
                                email,
                                password,
                                role: 'user'
                            };

                            const user = await signupService(userObj);
                            // const emailVerify = await sendVerificationEmail(user.dataValues.email,
                            //     mailSubject, message.verificationMessage(hostUrl));
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

                    <<
                    << << < HEAD
                    fbgooglesignup: async(req, res) => {
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
                                }; ===
                                === =
                                fbgooglesignup: async(req, res) => {
                                        try {
                                            const {
                                                first_name,
                                                last_name,
                                                email,
                                                id,
                                                role
                                            } = req.user;

                                            const data = {
                                                first_name,
                                                last_name,
                                                email,
                                                id,
                                                role
                                            }; >>>
                                            >>> > updating the database models, migrations and seeders files

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

                                    <<
                                    << << < HEAD
                                login: async(req, res) => {
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
                                                    message.loginSuccess, {...data, token }
                                                );
                                            }
                                        } catch (err) {
                                            errorResponse(res, err.statusCode || statusCode.serverError, err);
                                        }
                                    },

                                    logout: async(req, res) => {
                                        try {
                                            const { token } = req;
                                            await logoutService(token);
                                            successResponse(res, statusCode.success, message.logoutSuccess);
                                        } catch (err) {
                                            errorResponse(res, statusCode.serverError, err.message);
                                        }
                                    }, ===
                                    === =
                                    login: async(req, res) => {
                                        try {
                                            const { email, password } = req.body;
                                            const validUser = await findUserByEmail(email);
                                            if (validUser === null || validUser === undefined) {
                                                throw new ApiErrors(message.userEmailNotFound(email), statusCode.notFound);
                                            }
                                            const { password: hashedPassword, ...data } = validUser.dataValues;
                                            const validPassword = await comparePassword(password, hashedPassword);
                                            if (!validPassword) {
                                                throw new ApiErrors(message.incorrectPassword, statusCode.badRequest);
                                            } else {
                                                const token = generateToken(data.id, email, data.role, data.first_name);
                                                return successResponseWithData(res, statusCode.success, message.loginSuccess, {...data, token });
                                            }
                                        } catch (err) {
                                            errorResponse(res, err.statusCode || statusCode.serverError, err);
                                        }
                                    },

                                    logout: async(req, res) => {
                                        try {
                                            const { token } = req;
                                            await logoutService(token);
                                            successResponse(res, statusCode.success, message.logoutSuccess);
                                        } catch (err) {
                                            errorResponse(res, statusCode.serverError, err.message);
                                        }
                                    }, >>>
                                    >>> > updating the database models, migrations and seeders files
                            };
