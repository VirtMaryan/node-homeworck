const { authService } = require('../services');
const { modelOAuth } = require('../dataBase');

module.exports = {
  login: async (req, res, next) => {
    try {
      const { user, body: { password } } = req;
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
      await modelOAuth.deleteMany({ user_id: req.authUsre._id });

      res.json('ok')
    } catch (e) {
      next(e);
    }
  },

  getNewTokenPairByRefresh: async (req, res, next) => {
    try {
      const refresh_token = req.get('Authorization');//якщо deleteMany то цей хедр не потрібний 
      const user = req.authUsre;
      // await modelOAuth.deleteMany({ user_id: user._id });
      await modelOAuth.deleteOne({ refresh_token });

      const newTokenPair = authService.generateTokenPair();
      await modelOAuth.create({ user_id: user._id, ...newTokenPair });

      res.json({
        ...newTokenPair,
        user
      });
    } catch (e) {
      next(e);
    }
  }
}
