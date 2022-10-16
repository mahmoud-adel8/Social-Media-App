import UserService from '../services/user-services.js';

export default class AuthController {
  static async signup(req, res, next) {
    const userObj = req.body;
    try {
      const user = await UserService.signup(userObj);
      res.status(201).json({
        message: 'Your account has been created successfully',
        user: user,
      });
    } catch (err) {
      next(err);
    }
  }

  static async signin(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    try {
      const token = await UserService.signin(email, password);
      res
        .status(200)
        .json({ message: 'You are signed in successfylly.', token: token });
    } catch (err) {
      next(err);
    }
  }
}
