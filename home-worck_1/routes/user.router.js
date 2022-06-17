const { Router } = require('express');

const { userController } = require('../controllers');
const { userMiddlewars } = require('../middlewares');
const { paramTypeEnum } = require('../constants');

const userRouter = Router();

userRouter.get('/', userController.getAllUsers);
userRouter.post('/', userMiddlewars.validateUser, userMiddlewars.checkEmailDuplicate, userController.createUser);

userRouter.use('/:userId', userMiddlewars.checkIsIDValid,
  userMiddlewars.getUsreDynamiclly('userId', paramTypeEnum.PARAMS, '_id'));

userRouter.get('/:userId', userController.getUserById);
userRouter.delete('/:userId', userController.deleteUser);
userRouter.put('/:userId', userMiddlewars.validateUpdate, userController.updateUser);

userRouter.post('/:userId/photo', userMiddlewars.checkAvatarUser, userController.uploadUserPhoto);

module.exports = userRouter
