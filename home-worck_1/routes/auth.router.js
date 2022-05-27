const { Router } = require('express');

const { actionTypeEnum } = require('../constants');
const { authController } = require('../controllers');
const { authMiddlewars, userMiddlewars } = require('../middlewares');

const authRouter = Router();

authRouter.post('/login', authMiddlewars.isLoginDataValid, userMiddlewars.getUsreDynamiclly('email'), authController.login);

authRouter.post('/logout', authMiddlewars.chekAccessToken, authController.logout);
authRouter.post('/refresh', authMiddlewars.chekRefreshToken, authController.getNewTokenPairByRefresh);

authRouter.post('/password/forgot',
  authMiddlewars.isEmailValid,
  userMiddlewars.getUsreDynamiclly('email'),
  authController.forgotPassword);

authRouter.put('/password/forgot',
  authMiddlewars.isPasswordlValid,
  authMiddlewars.chekActionToken(actionTypeEnum.FORGOT_PASSWORD),
  authController.setPasswordAfterForgot);

module.exports = authRouter
