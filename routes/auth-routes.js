import { Router } from 'express';

import AuthController from '../controllers/auth-controller.js';
import { signupSchema, signinSchema } from '../schemas/user-schema.js';
import { validateRequestSchema } from '../middlewares/validate-request-schema.js';

const router = Router();

router.put(
  '/signup',
  signupSchema,
  validateRequestSchema,
  AuthController.signup
);

router.post(
  '/login',
  signinSchema,
  validateRequestSchema,
  AuthController.signin
);

export default router;
