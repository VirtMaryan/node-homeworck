const { modelCar } = require('../dataBase');
const { ApiError } = require('../error');
const { carValidator } = require('../validators');

const chekDuplicateCar = async (req, res, next) => {
  try {
    const { producer } = req.body;

    const isProducer = await modelCar.findOne({ producer: producer.toLowerCase().trim() });

    if (isProducer) {
      next(new ApiError('Producer is already exists', 409));
      return;
    }

    next();
  } catch (e) {
    next(e);
  }
};

const checkCarIdValid = (req, res, next) => {
  try {
    const { carId } = req.params;

    if (carId.length !== 24) {
      next(new ApiError('Id not valid', 400));
      return;
    }

    next()
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
};

const validateCar = (req, res, next) => {
  try {
    const { error, value } = carValidator.joiCarSchema.validate(req.body);

    if (error) {
      next(new ApiError(error.details[0].message, 400));
      return;
    }

    req.body = value;

    next()
  } catch (e) {
    next(e);
  }
}

module.exports = {
  chekDuplicateCar,
  checkIsCarPresent,
  checkCarIdValid,
  validateCar
}
