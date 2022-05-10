const modelUser = require('../dataBase/user-models');
const ApiError = require('../error/ApiError');

const checkCreateUsers = async (req, res, next) => {
  try {
    const { email = '', name } = req.body;

    if (!name) {
      next(new ApiError('Name is required', 400));
      return;
    };

    if (!email) {
      next(new ApiError('Email is required', 400));
      return
    };

    const userIsPresent = await modelUser.findOne({ email: email.toLowerCase().trim() });

    if (userIsPresent) {
      next(new ApiError('User with this email exists', 409));
      return;
    };

    next();
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

module.exports = {
  checkCreateUsers,
  checkIsUserPresent
}
