import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import UserModel from '../models/user-model.js';

dotenv.config();

export default class UserService {
  static async findById(id) {
    try {
      const user = await UserModel.findById(id);
      if (!user) {
        const err = new Error('User cannot be found.');
        err.statusCode = 422;
        throw err;
      }
      return user;
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      throw err;
    }
  }

  static async signup(userObj) {
    const { email, password } = { ...userObj };
    try {
      const userExists = await UserModel.exists({ email: email });
      if (userExists) {
        const err = new Error('A user with this email already exists.');
        err.statusCode = 422;
        throw err;
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      userObj.password = hashedPassword;
      const user = new UserModel(userObj);
      return await user.save();
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      throw err;
    }
  }

  static async signin(email, password) {
    try {
      const user = await UserModel.findOne({ email: email });
      if (!user) {
        const err = new Error('Invalid email or password.');
        err.statusCode = 401;
        throw err;
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        const err = new Error('Invalid email or password.');
        err.statusCode = 401;
        throw err;
      }

      const jwtPayload = { userId: user._id.toString(), email: user.email };
      const jwtSecret = process.env.JWT_SECRET;
      const jwtConfig = { expiresIn: process.env.JWT_EXPIRATION };
      return jwt.sign(jwtPayload, jwtSecret, jwtConfig);
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      throw err;
    }
  }

  static async addPost(post) {
    try {
      const user = await UserModel.findById(post.creator);
      user.posts.push(post);
      return await user.save();
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      throw err;
    }
  }

  static async deletePost(post) {
    try {
      return await UserModel.updateOne(
        { _id: post.creator },
        { $pull: { posts: post._id } }
      );
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      throw err;
    }
  }
}
