const { Router } = require('express');

const welcomeController = require('../controllers/welcomepage.controller');

const welcomeRouter = Router();

welcomeRouter.get('/', welcomeController.getWelcome);

module.exports = welcomeRouter;