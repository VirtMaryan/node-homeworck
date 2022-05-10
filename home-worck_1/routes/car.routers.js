const { Router } = require('express');

const carController = require('../controllers/car.controller');
const carMiddelwares = require('../middlewares/car.middelwares');

const carRouter = Router();

carRouter.get('/', carController.getAllCars);
carRouter.post('/', carMiddelwares.chekCreateCar, carController.createCar);

carRouter.all('/:carId', carMiddelwares.checkIsCarPresent);
carRouter.get('/:carId', carController.getCarById);
carRouter.put('/:carId', carController.updateCar);
carRouter.delete('/:carId', carController.deleteCar);

module.exports = carRouter
