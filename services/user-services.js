import bcrypt from 'bcryptjs';

import UserModel from '../models/user-model.js';

export default class UserService {
  static async save(userObj) {
    const { email, password } = { ...userObj };
    try {
      const existingUser = await UserModel.findOne({email: email})
      if (existingUser) {
        const err = new Error('A user with this email already exists.');
        err.statusCode = 422;
        throw err;
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      userObj.password = hashedPassword;
      return await UserModel.save(userObj)
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      throw err;
    }

  }
}
