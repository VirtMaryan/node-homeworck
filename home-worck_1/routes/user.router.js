const { Router } = require('express');

const userController = require('../controllers/user.controller');
const userMiddlewars = require('../middlewares/user.middelwares');


const userRouter = Router();

userRouter.get('/', userController.getAllUsers);
userRouter.post('/', userMiddlewars.checkCreateUsers, userController.createUser);

userRouter.all('/:userId', userMiddlewars.checkIsUserPresent);
userRouter.get('/:userId', userController.getUserById);
userRouter.put('/:userId', userController.updateUser);
userRouter.delete('/:userId', userController.deleteUser);

module.exports = userRouter
