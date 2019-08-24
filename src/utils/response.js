/**
* This is the function that will handle responses...
*
*@param {object} res - this is the http res object.
*@param {int} status - this is the status code for the response..
*@param {string} resStatusMessage - this is the message showing the res status..
*@param {object} data - this is the response data that will be sent.
*
*@example
*
*response(res, 200, 'success', {id: 1})
*/
const response = (res, status, resStatusMessage, data) => res.status(status).json({
  status: resStatusMessage,
  data
});

export default response;
