const { Router } = require('express');

const carController = require('../controllers/car.controller');

const carRouter = Router();

carRouter.get('/', carController.getAllCars);

carRouter.get('/:carId', carController.getCarById);

carRouter.post('/', carController.createCar);

carRouter.put('/:carId', carController.updateCar);

carRouter.delete('/:carId', carController.deleteCar);

module.exports = carRouter;