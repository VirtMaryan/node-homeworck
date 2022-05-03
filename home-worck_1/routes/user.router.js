const { Router } = require('express');

const userController = require('../controllers/user.controller');

const userRouter = Router();

userRouter.get('/', userController.getAllUsers);

userRouter.get('/:userIndex', userController.getUserById);

userRouter.post('/', userController.createUser);

userRouter.put('/:userIndex', userController.updateUser);

userRouter.delete('/:userIndex', userController.deleteUser);

module.exports = userRouter;