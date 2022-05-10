const modelCar = require('../dataBase//car-models');

module.exports = {
  getAllCars: async (req, res, next) => {
    try {
      const { limit = 20, page = 1 } = req.query;
      const skip = (page - 1) * limit;

      const cars = await modelCar.find().limit(limit).skip(skip);
      const count = await modelCar.count({});

      res.status(200)
        .json({
          page,
          perPage: limit,
          data: cars,
          count
        });

    } catch (e) {
      next(e);
    }
  },

  getCarById: (req, res, next) => {
    try {
      res.status(200).json(req.car);
    } catch (e) {
      next(e);
    }
  },

  createCar: async (req, res, next) => {
    try {
      const createCar = await modelCar.create(req.body);

      res.status(201).json(createCar);
    } catch (e) {
      next(e);
    }
  },

  updateCar: async (req, res, next) => {
    try {
      const { carId } = req.params;
      const car = await modelCar.updateOne(
        { _id: carId },
        { $set: req.body },
        { new: true }
      );

      res.status(200).json(car);
    } catch (e) {
      next(e);
    }
  },

  deleteCar: async (req, res, next) => {
    try {
      const { carId } = req.params;
      const car = await modelCar.findByIdAndDelete(carId);

      res.status(200).json('Car was deleted successful');
    } catch (e) {
      next(e);
    }
  }
}