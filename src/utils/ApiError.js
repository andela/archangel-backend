/**
 * ApiError
 */
export default class ApiError extends Error {
	/**
	 *
	 * @param {*} statusCode
	 * @param {*} message
	 */
	constructor(statusCode, message) {
		super();

		this.statusCode = statusCode;
		this.message = message;
	}
}
