import { Router } from 'express';

import FeedController from '../controllers/feed-controller.js';
import { postSchema } from '../schemas/post-schema.js';
import { validateRequestSchema } from '../middlewares/validate-request-schema.js';
import { authorizeUser } from '../middlewares/authorization.js';

const router = Router();

router.get('/posts', FeedController.getPosts);

router.get('/posts/:postId', FeedController.getPost);

router.post(
  '/posts',
  postSchema,
  validateRequestSchema,
  FeedController.createPost
);

router.put(
  '/posts/:postId',
  postSchema,
  validateRequestSchema,
  authorizeUser,
  FeedController.updatePost
);

router.delete('/posts/:postId', authorizeUser, FeedController.deletePost);

export default router;
