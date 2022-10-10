import { validationResult } from 'express-validator';

export function validateRequestSchema(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error('The date entered is not correct.');
    err.statusCode = 422;
    err.details = errors.array();
    throw err;
  }
  next();
}
