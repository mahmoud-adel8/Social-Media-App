import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import UserModel from '../models/user-model.js';
import APIError from '../util/api-error.js';

dotenv.config();

export default class UserService {
  static async findById(id) {
    try {
      const user = await UserModel.findById(id);
      if (!user) {
        throw APIError.unprocessableEntity('user cannot be found.');
      }
      return user;
    } catch (error) {
      throw APIError.of(error);
    }
  }

  static async signup(userObj) {
    const { email, password } = { ...userObj };
    try {
      const userExists = await UserModel.exists({ email: email });
      if (userExists) {
        throw APIError.unprocessableEntity(
          'a user with this email already exists, try signing in.'
        );
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      userObj.password = hashedPassword;
      const user = new UserModel(userObj);
      return await user.save();
    } catch (error) {
      throw APIError.of(error);
    }
  }

  static async signin(email, password) {
    try {
      const user = await UserModel.findOne({ email: email });
      if (!user) {
        throw APIError.unprocessableEntity('invalid email or password.');
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw APIError.unprocessableEntity('invalid email or password.');
      }

      const jwtPayload = { userId: user._id.toString(), email: user.email };
      const jwtSecret = process.env.JWT_SECRET;
      const jwtConfig = { expiresIn: process.env.JWT_EXPIRATION };
      return jwt.sign(jwtPayload, jwtSecret, jwtConfig);
    } catch (error) {
      throw APIError.from(error);
    }
  }

  static async addPost(post) {
    try {
      const user = await UserModel.findById(post.creator);
      user.posts.push(post);
      return await user.save();
    } catch (error) {
      throw APIError.from(error);
    }
  }

  static async deletePost(post) {
    try {
      return await UserModel.updateOne(
        { _id: post.creator },
        { $pull: { posts: post._id } }
      );
    } catch (error) {
      throw APIError.from(error);
    }
  }
}
