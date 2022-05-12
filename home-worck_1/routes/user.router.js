const { Router } = require('express');

const { userController } = require('../controllers');
const { userMiddlewars } = require('../middlewares');


const userRouter = Router();

userRouter.get('/', userController.getAllUsers);
userRouter.post('/', userMiddlewars.validateUser, userMiddlewars.checkEmailDuplicate, userController.createUser);

userRouter.all('/:userId', userMiddlewars.checkIsIDValid, userMiddlewars.checkIsUserPresent);
userRouter.get('/:userId', userController.getUserById);
userRouter.delete('/:userId', userController.deleteUser);
userRouter.patch('/:userId', userController.updateUser);

module.exports = userRouter
