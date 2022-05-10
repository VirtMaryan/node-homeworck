const modelCar = require('../dataBase/car-models');
const ApiError = require('../error/ApiError');

const chekCreateCar = async (req, res, next) => {
  try {
    const { producer = '', year } = req.body;

    if (!producer) {
      next(new ApiError('Producer is required', 400));
      return;
    };

    if (!year) {
      next(new ApiError('Year is required', 400));
      return;
    };

    const isProducer = await modelCar.findOne({ producer: producer.toLowerCase().trim() });

    if (isProducer) {
      next(new ApiError('Producer is already exists', 409));
      return;
    };

    next();
  } catch (e) {
    next(e);
  }
};

const checkIsCarPresent = async (req, res, next) => {
  try {
    const { carId } = req.params;

    const carById = await modelCar.findById(carId);

    if (!carById) {
      next(new ApiError('Car is not found ', 404));
      return;
    }

    req.car = carById;

    next()
  } catch (e) {
    next(e);
  }
}

module.exports = {
  chekCreateCar,
  checkIsCarPresent
}
