export default class ApiErrors extends Error {
  constructor(message, statusCode) {
    super();

    this.message = message;
    this.statusCode = statusCode;
  }
}
