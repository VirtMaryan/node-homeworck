const { emailActionsEnum, actionTypeEnum } = require('../constants');
const { authService, emailService } = require('../services');
const { modelOAuth, modelActionToken, modelUser } = require('../dataBase');
const { FRONTEND_URL } = require('../config/config');

module.exports = {
  login: async (req, res, next) => {
    try {
      const { user, body: { password, email } } = req;

      await emailService.sendMail(email, emailActionsEnum.WELCOME);
      await authService.comparePassword(user.password, password);

      const tokenPair = authService.generateTokenPair();
      await modelOAuth.create({ user_id: user._id, ...tokenPair });

      res.json({
        ...tokenPair,
        user
      });
    } catch (e) {
      next(e);
    }
  },

  logout: async (req, res, next) => {
    try {
      await emailService.sendMail(req.authUsre.email, emailActionsEnum.LOGOUT);
      await modelOAuth.deleteMany({ user_id: req.authUsre._id });

      res.json('ok')
    } catch (e) {
      next(e);
    }
  },

  getNewTokenPairByRefresh: async (req, res, next) => {
    try {
      const refresh_token = req.get('Authorization');
      const authUser = req.authUsre;

      await modelOAuth.deleteOne({ refresh_token });

      const newTokenPair = authService.generateTokenPair();
      await modelOAuth.create({ user_id: authUser._id, ...newTokenPair });

      res.json({
        ...newTokenPair,
        authUser
      });
    } catch (e) {
      next(e);
    }
  },

  forgotPassword: async (req, res, next) => {
    try {
      const { user, body: { email } } = req;
      const token = authService.generateActionToken();

      await modelActionToken.create({
        token,
        user_id: user._id,
        actionType: actionTypeEnum.FORGOT_PASSWORD
      });

      const forgotPassURL = `${FRONTEND_URL}/password/forgot?token=${token}`;

      await emailService.sendMail(
        email, emailActionsEnum.FORGOT_PASSWORD,
        { forgotPassURL, userName: user.name });

      res.json('all oke')
    } catch (e) {
      next(e);
    }
  },

  setPasswordAfterForgot: async (req, res, next) => {
    try {
      const { user, body } = req;
      const token = req.get('Authorization');
      const newPassword = await authService.hashPassword(body.password);

      await modelUser.updateOne({ _id: user._id }, { password: newPassword });
      await modelOAuth.deleteMany({ user_id: user._id });
      await modelActionToken.deleteOne({ token });

      res.json('New password was set')
    } catch (e) {
      next(e);
    }
  },

  changePassword: async (req, res, next) => {
    try {
      const { user, body: { password, newPassword } } = req;

      await authService.comparePassword(user.password, password);

      const hashPass = await authService.hashPassword(newPassword);

      await modelUser.updateOne({ _id: user._id }, { password: hashPass });

      res.json('Password was chenged successful')
    } catch (e) {
      next(e);
    }
  }
}
