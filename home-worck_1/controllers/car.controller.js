const DB = require('../dataBase/users');

module.exports = {
  getAllCars: (req, res) => {
    res.json(DB.carsArr);
  },

  getCarById: (req, res) => {
    const { carIndex } = req.params;

    res.json(DB.carsArr[carIndex]);
  },

  createCar: (req, res) => {
    DB.carsArr.push(req.body);

    res.json(DB.carsArr);
  },

  updateCar: (req, res) => {
    const { carIndex } = req.params;
    DB.carsArr.splice(carIndex, 1, req.body);

    res.json(DB.carsArr);
  },

  deleteCar: (req, res) => {
    const { carIndex } = req.params;

    DB.carsArr.splice(carIndex, 1);

    res.json(DB.carsArr);
  }
}