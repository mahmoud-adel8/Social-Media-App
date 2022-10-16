import { validationResult } from 'express-validator';
import APIError from '../util/api-error.js';
import { clearImage } from '../util/file-helper.js';

export function validateRequestSchema(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (req.file) {
      clearImage(req.file.path);
    }
    next(APIError.unprocessableEntity(undefined, errors.array()));
  }
  next();
}
