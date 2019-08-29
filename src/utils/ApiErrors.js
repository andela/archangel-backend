/**
 * Declaring a class for API errors
 */
export default class ApiErrors extends Error {
    constructor(message, statusCode) {
        super();

        this.message = message;
        this.statusCode = statusCode;
    }
}