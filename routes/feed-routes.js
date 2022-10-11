import { Router } from 'express';

import FeedController from '../controllers/feed-controller.js';
import { postSchema } from '../schemas/post-schema.js';
import { validateRequestSchema } from '../middlewares/validate-request-schema.js';

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
  FeedController.updatePost
);

router.delete('/posts/:postId', FeedController.deletePost);

export default router;
