// functions for success and error responses

const successResponse = (res, statusCode, message) => res
  .status(statusCode).send({
    statusCode,
    message,
  });

const successResponseWithData = (res, statusCode, message, data) => res
  .status(statusCode).send({
    statusCode,
    data,
    message,
  });

const errorResponse = (res, statusCode, error) => res
  .status(statusCode).send({
    statusCode,
    error,
  });

export { successResponse, successResponseWithData, errorResponse };
