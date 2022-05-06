const { Router } = require('express');

const userController = require('../controllers/user.controller');
const userMiddlewars = require('../middlewares/user.middelwares');


const userRouter = Router();

userRouter.get('/', userController.getAllUsers);

userRouter.get('/:userId', userMiddlewars.chekGetUserById, userController.getUserById);

userRouter.post('/', userMiddlewars.checkCreateUsers, userController.createUser);

userRouter.put('/:userId', userMiddlewars.chekUpdateUser, userController.updateUser);

userRouter.delete('/:userId', userMiddlewars.chekDeleteUser, userController.deleteUser);

module.exports = userRouter;