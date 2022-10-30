import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import UserService from '../services/user-services.js';
import APIError from '../util/api-error.js';
import PostService from '../services/post-services.js';

dotenv.config();

export async function verifyToken(req, res, next) {
  try {
    const authHeader = req.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      throw APIError.unauthorized();
    }
    const token = authHeader.slice(7);
    const jwtSecret = process.env.JWT_SECRET;
    const payload = jwt.verify(token, jwtSecret);
    if (!payload) {
      throw APIError.forbidden();
    }
    req.userId = payload.userId;
    next();
  } catch (error) {
    next(APIError.from(error));
  }
}

export async function authorizeUser(req, res, next) {
  const postId = req.params.postId;
  const userId = req.userId;
  try {
    const post = await PostService.getPostById(postId);
    if (post._id.toString() !== userId) {
      throw APIError.forbidden();
    }
    next();
  } catch (error) {
    next(APIError.from(error));
  }
}
