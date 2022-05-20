const { modelUser } = require('../dataBase');
const { ApiError } = require('../error');
const { userValidator } = require('../validators');
const { paramTypeEnum } = require('../constants');

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

// eslint-disable-next-line arrow-body-style
const getUsreDynamiclly = (paramName = '_id', where = paramTypeEnum.BODY, dataBaseField = paramName) => {
  return async (req, res, next) => {
    try {
      const payload = req[where];

      if (!payload || typeof payload !== 'object') {
        next(new ApiError('wrong param in middelwares'));
        return;
      }

      const param = payload[paramName];

      const user = await modelUser.findOne({ [dataBaseField]: param }).select('+password');

      if (!user) {
        next(new ApiError('User is not found ', 404));
        return;
      }

      req.user = user;
      next()
    } catch (e) {
      next(e)
    }
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
  getUsreDynamiclly,
  checkEmailDuplicate,
  checkIsIDValid,
  validateUpdate,
  validateUser
}
