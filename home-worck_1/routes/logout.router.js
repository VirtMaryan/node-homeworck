const { Router } = require('express');

const { logoutController } = require('../controllers');

const logoutRouter = Router();

logoutRouter.get('/', logoutController.getLogout);

module.exports = logoutRouter
