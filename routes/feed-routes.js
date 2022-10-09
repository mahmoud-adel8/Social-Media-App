const express = require('express');

const feedController = require('../controllers/feed-controller');
const postSchema = require('../schemas/post-schema');
const validateRequestSchema = require('../middlewares/validate-request-schema');

const router = express.Router();

router.get('/posts', feedController.getPosts);

router.post('/posts', postSchema, validateRequestSchema, feedController.createPost);

module.exports = router;