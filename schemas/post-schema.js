const { body } = require('express-validator');

const schema = [
  body('title').trim().isLength({ min: 3 }).withMessage('Title must be at least 3 characters.'),
  body('content').trim().isLength({ min: 5 }).withMessage('content must be at least 5 characters.'),
];

module.exports = schema;
