const { modelCar } = require('../dataBase/models');

module.exports = {
  getAllCars: async (req, res) => {
    const cars = await modelCar.find();

    res.json(cars);
  },

  getCarById: async (req, res) => {
    try {
      const { carId } = req.params;
      const car = await modelCar.findById(carId);

      if (!car) {
        res.status(404).json(`Car with id ${carId} not found`);
        return;
      };

      res.json(car);
    } catch (e) {
      res.json(e)
    }
  },

  createCar: async (req, res) => {
    try {
      const createCar = await modelCar.create(req.body);

      res.status(201).json(createCar);
    } catch (e) {
      res.json(e);
    }
  },

  updateCar: async (req, res) => {
    try {
      const { carId } = req.params;
      const car = await modelCar.findOneAndUpdate(
        carId,
        { year: 2022 },
        { new: true }
      );

      if (!car) {
        res.status(404).json(`Car with id ${carId} not found`);
        return;
      };

      res.json(car);
    } catch (e) {
      res.json(e)
    }
  },

  deleteCar: async (req, res) => {
    try {
      const { carId } = req.params;
      const car = await modelCar.findByIdAndDelete(carId);

      if (!car) {
        res.status(404).json(`Car with id ${carId} not found`);
        return;
      };

      res.json(car);
    } catch (e) {
      res.json(e)
    }
  }
}