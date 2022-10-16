import ResponseError from "./response-error.js";

export default class APIError {

  static badRequest(message = 'Invalid request', details) {
    return new ResponseError(message, 400, details);
  }

  static unprocessableEntity(message = 'The server understood the request, but is unable to process it', details) {
    return new ResponseError(message, 422, details);
  }

  static internalServerError(message = 'Internal server error', details) {
    return new ResponseError(message, 500, details);
  }

  static unauthorized(message = 'Your not authorized to do this action', details) {
    return new ResponseError(message, 401, details);
  }

  static forbidden(message = 'You do not have priviliges to perform this action', details) {
    return new ResponseError(message, 403, details);
  }

  static notFound(message = 'URL not found', details) {
    return new ResponseError(message, 404, details);
  }

  static from(error) {
    return new ResponseError(error.message, error.status || 500, error.details);
  }

}