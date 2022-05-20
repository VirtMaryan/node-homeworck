const { Router } = require('express');

const { authController } = require('../controllers');
const { authMiddlewars, userMiddlewars } = require('../middlewares');

const authRouter = Router();

authRouter.post('/login', authMiddlewars.isLoginDataValid, userMiddlewars.getUsreDynamiclly('email'), authController.login);

authRouter.post('/logout', authMiddlewars.chekAccessToken, authController.logout);
authRouter.post('/refresh', authMiddlewars.chekRefreshToken, authController.getNewTokenPairByRefresh);

module.exports = authRouter
