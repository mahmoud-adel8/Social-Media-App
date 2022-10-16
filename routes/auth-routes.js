import { Router } from 'express';

import AuthController from '../controllers/auth-controller.js';
import { userSchema } from '../schemas/user-schema.js';
import { validateRequestSchema } from '../middlewares/validate-request-schema.js';

const router = Router();

router.put('/signup', userSchema, validateRequestSchema, AuthController.signup);

router.post('/login', )

export default router;
