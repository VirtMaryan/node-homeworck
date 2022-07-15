const { Router } = require('express');

const { userController } = require('../controllers');
const { userMiddlewars } = require('../middlewares');
const { paramTypeEnum } = require('../constants');
const { cacheService } = require('../services');

const userRouter = Router();

userRouter.get('/', userController.getAllUsers);
userRouter.post('/',
  userMiddlewars.validateUser, userMiddlewars.checkEmailDuplicate, userMiddlewars.checkPhoneDuplicate, userController.createUser);

userRouter.get('/redis/json', cacheService.redisCache.route({ expire: 3600 }), userController.getJSONusers);
userRouter.get('/redis', userController.getUserFromRedsi);
userRouter.post('/redis', userController.setUserToRedis);
userRouter.get('/redis/:name', userController.getUserByNameFromRedsi);

userRouter.use('/:userId', userMiddlewars.checkIsIDValid,
  userMiddlewars.getUsreDynamiclly('userId', paramTypeEnum.PARAMS, '_id'));

userRouter.get('/:userId', cacheService.redisCache.route({ expire: 3600 }), userController.getUserById);
userRouter.delete('/:userId', userController.deleteUser);
userRouter.put('/:userId', userMiddlewars.validateUpdate, userController.updateUser);

userRouter.post('/:userId/photo', userMiddlewars.checkAvatarUser, userController.uploadUserPhoto);

module.exports = userRouter
