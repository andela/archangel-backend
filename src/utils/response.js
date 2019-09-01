/**
 * Add two numbers.
 * @param {object} res - This is the http res object.
 * @param {number} statusCode - This is the status code for the response.
 * @param {string} message - This is the message showing the res status.
 * @param {object} data - This is the response data that will be sent.
 * @returns {function} a function that responds to the users.
 */
export default {
    successResponse: (res, statusCode, message) => res.status(statusCode).send({
        statusCode,
        message,
    }),
    successResponseWithData: (res, statusCode, message, data) => res.status(statusCode).send({
        statusCode,
        data,
        message,
    }),
    errorResponse: (res, statusCode, error) => res.status(statusCode).send({
        statusCode,
        error,
    }),
};