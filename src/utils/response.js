// functions for success and error responses

export const successResponse = (res, statusCode, message) => res
  .status(statusCode).send({
    statusCode,
    message,
  });
export const successResponseWithData = (res, statusCode, message, data) => res
  .status(statusCode).send({
    statusCode,
    data,
    message,
  });
export const errorResponse = (res, statusCode, error) => res
  .status(statusCode).send({
    statusCode,
    error,
  });
