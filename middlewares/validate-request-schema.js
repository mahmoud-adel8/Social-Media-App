import { validationResult } from 'express-validator';
import { clearImage } from '../util/file-helper.js';

export function validateRequestSchema(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (req.file) {
      clearImage(req.file.path);
    }
    const err = new Error('The date entered is not correct.');
    err.statusCode = 422;
    err.details = errors.array();
    throw err;
  }
  next();
}
