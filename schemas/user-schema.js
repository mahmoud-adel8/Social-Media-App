import { body } from 'express-validator';

export const signupSchema = [
  body('name').trim().notEmpty().withMessage('Name cannot be empty.'),
  body('email')
    .isEmail()
    .withMessage('Email entered is not valid.')
    .normalizeEmail(),
  body('password')
    .trim()
    .isLength({ min: 5 })
    .withMessage('email must be at least 5 characters.'),
];

export const signinSchema = [
  body('email')
    .isEmail()
    .withMessage('Email entered is not valid.')
    .normalizeEmail(),
  body('password')
    .trim()
    .isLength({ min: 5 })
    .withMessage('email must be at least 5 characters.'),
];
