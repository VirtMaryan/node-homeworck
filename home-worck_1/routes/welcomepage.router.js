const { Router } = require('express');

const { welcomeController } = require('../controllers');

const welcomeRouter = Router();

welcomeRouter.get('/', welcomeController.getWelcome);

module.exports = welcomeRouter
