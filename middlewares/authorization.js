import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

export async function verifyToken(req, res, next) {
  try {
    const authHeader = req.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      const err = new Error('Not authorized');
      err.statusCode = 401;
      throw err;
    }
    const token = authHeader.slice(7);
    const jwtSecret = process.env.JWT_SECRET;
    const payload = jwt.verify(token, jwtSecret);
    req.userId = payload.userId;
    next();
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}