const { Router } = require('express');

const logoutController = require('../controllers/logout.controller');

const logoutRouter = Router();

logoutRouter.get('/', logoutController.getLogout);

module.exports = logoutRouter;