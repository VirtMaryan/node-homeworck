const { Router } = require('express');

const carController = require('../controllers/car.controller');

const carRouter = Router();

carRouter.get('/', carController.getAllCars);

carRouter.get('/:carIndex', carController.getCarById);

carRouter.post('/', carController.createCar);

carRouter.put('/:carIndex', carController.updateCar);

carRouter.delete('/:carIndex', carController.deleteCar);

module.exports = carRouter;