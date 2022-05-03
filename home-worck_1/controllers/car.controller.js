const DB = require('../dataBase/users');

module.exports = {
  getAllCars: (req, res) => {
    res.json(DB.carsArr);
  },

  getCarById: (req, res) => {
    const { carIndex } = req.params;
    const car = DB.carsArr[carIndex];

    if (!car) {
      res.status(404).json(`Car with id ${carIndex} not found`);
      return;
    };

    res.json(car);
  },

  createCar: (req, res) => {
    DB.carsArr.push(req.body);

    res.json(DB.carsArr);
  },

  updateCar: (req, res) => {
    const { carIndex } = req.params;
    const car = DB.carsArr[carIndex];

    if (!car) {
      res.status(404).json(`Car with id ${carIndex} not found`);
      return;
    };

    DB.carsArr.splice(carIndex, 1, req.body);

    res.json(DB.carsArr);
  },

  deleteCar: (req, res) => {
    const { carIndex } = req.params;
    const car = DB.carsArr[carIndex];

    if (!car) {
      res.status(404).json(`Car with id ${carIndex} not found`);
      return;
    };

    DB.carsArr.splice(carIndex, 1);

    res.json(DB.carsArr);
  }
}