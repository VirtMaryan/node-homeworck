const { modelUser } = require('../dataBase');
const { ApiError } = require('../error');
const { userValidator } = require('../validators');

const checkEmailDuplicate = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userIsPresent = await modelUser.findOne({ email: email.toLowerCase().trim() });

    if (userIsPresent) {
      next(new ApiError('User with this email exists', 409));
      return;
    }

    next();
  } catch (e) {
    next(e);
  }
};

const checkIsIDValid = (req, res, next) => {
  try {
    const { userId } = req.params;

    if (userId.length !== 24) {
      next(new ApiError('Id not valid', 400));
      return;
    }

    next()
  } catch (e) {
    next(e);
  }
};

const checkIsUserPresent = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const userById = await modelUser.findById(userId);

    if (!userById) {
      next(new ApiError('User is not found ', 404));
      return;
    }

    req.user = userById;

    next()
  } catch (e) {
    next(e);
  }
};

const validateUser = (req, res, next) => {
  try {
    const { error, value } = userValidator.joinUserSchema.validate(req.body);

    if (error) {
      next(new ApiError(error.details[0].message, 400));
      return;
    }

    req.body = value;

    next()
  } catch (e) {
    next(e);
  }
};

const validateUpdate = (req, res, next) => {
  try {
    const { error, value } = userValidator.joiUserUpdateSchema.validate(req.body);

    if (error) {
      next(new ApiError(error.details[0].message, 400));
      return;
    }

    req.body = value;

    next()
  } catch (e) {
    next(e);
  }
};

module.exports = {
  checkEmailDuplicate,
  checkIsIDValid,
  checkIsUserPresent,
  validateUpdate,
  validateUser
}
