const { validationResult } = require('express-validator');

const validateRequestSchema = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json(errors.array());
  }
  next();
};

module.exports = validateRequestSchema;
