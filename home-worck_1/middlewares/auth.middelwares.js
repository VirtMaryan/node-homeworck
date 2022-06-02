const { authService } = require('../services');
const { authValidator } = require('../validators');
const { tokenTypeEnum } = require('../constants');
const { ApiError } = require('../error');
const { modelOAuth, modelActionToken } = require('../dataBase');

async function chekAccessToken(req, res, next) {
  try {
    const access_token = req.get('Authorization');

    if (!access_token) {
      next(new ApiError('No token', 401));
      return
    }

    authService.validateToken(access_token);

    const tokenData = await modelOAuth.findOne({ access_token }).populate('user_id');

    if (!tokenData || !tokenData.user_id) {
      next(new ApiError('Not valid token', 401));
      return
    }

    req.authUsre = tokenData.user_id;

    next();
  } catch (e) {
    next(e);
  }
}

async function chekRefreshToken(req, res, next) {
  try {
    const refresh_token = req.get('Authorization');

    if (!refresh_token) {
      next(new ApiError('No token', 401));
      return
    }

    authService.validateToken(refresh_token, tokenTypeEnum.REFRESH);

    const tokenDataRefresh = await modelOAuth.findOne({ refresh_token }).populate('user_id');

    if (!tokenDataRefresh || !tokenDataRefresh.user_id) {
      next(new ApiError('Not valid token', 401));
      return
    }

    req.authUsre = tokenDataRefresh.user_id;

    next();
  } catch (e) {
    next(e);
  }
}

function isLoginDataValid(req, res, next) {
  try {
    const { error, value } = authValidator.loginSchema.validate(req.body);

    if (error) {
      next(new ApiError(error.details[0].message, 400));
      return
    }

    req.body = value;

    next();
  } catch (e) {
    next(e);
  }
}

function isEmailValid(req, res, next) {
  try {
    const { error, value } = authValidator.emailSchema.validate(req.body);

    if (error) {
      next(new ApiError(error.details[0].message, 400));
      return
    }

    req.body = value;

    next();
  } catch (e) {
    next(e);
  }
}

function isPasswordlValid(req, res, next) {
  try {
    const { error, value } = authValidator.passworSchema.validate(req.body);

    if (error) {
      next(new ApiError(error.details[0].message, 400));
      return
    }

    req.body = value;

    next();
  } catch (e) {
    next(e);
  }
}

function isNewPasswordlValid(req, res, next) {
  try {
    const { error, value } = authValidator.newPassworSchema.validate(req.body);

    if (error) {
      next(new ApiError(error.details[0].message, 400));
      return
    }

    req.body = value;

    next();
  } catch (e) {
    next(e);
  }
}

function chekActionToken(actionType) {
  return async function(req, res, next) {
    try {
      const token = req.get('Authorization');

      if (!token) {
        next(new ApiError('No token', 401));
        return
      }

      authService.validateToken(token, actionType);

      const tokenData = await modelActionToken.findOne({ token, actionType }).populate('user_id');

      if (!tokenData || !tokenData.user_id) {
        next(new ApiError('Not valid token', 401));
        return
      }

      req.user = tokenData.user_id;

      next();
    } catch (e) {
      next(e);
    }
  }
}

module.exports = {
  chekAccessToken,
  chekRefreshToken,
  isLoginDataValid,
  isEmailValid,
  isPasswordlValid,
  chekActionToken,
  isNewPasswordlValid
};
