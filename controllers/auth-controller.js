import UserService from '../services/user-services.js';

export default class AuthController {
  static async signup(req, res, next) {
    const userObj = req.body;
    try {
      const user = await UserService.save(userObj);
      res.status(201).json({
        message: 'Your account has been created successfully',
        user: user,
      });
    } catch (err) {
      next(err);
    }
  }
}
