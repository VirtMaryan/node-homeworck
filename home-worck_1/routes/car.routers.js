const { Router } = require('express');

const { carController } = require('../controllers');
const { carMiddelwares } = require('../middlewares');

const carRouter = Router();

carRouter.get('/', carController.getAllCars);
carRouter.post('/', carMiddelwares.validateCar, carMiddelwares.chekDuplicateCar, carController.createCar);

carRouter.all('/:carId', carMiddelwares.checkCarIdValid, carMiddelwares.checkIsCarPresent);
carRouter.get('/:carId', carController.getCarById);
carRouter.put('/:carId', carMiddelwares.checkCarType, carController.updateCar);
carRouter.delete('/:carId', carController.deleteCar);

module.exports = carRouter
