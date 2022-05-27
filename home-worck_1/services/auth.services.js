const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { ApiError } = require('../error');
const { REFRESH_TOKEN, ACCESS_TOKEN, ACTION_TOKEN } = require('../config/config');
const { tokenTypeEnum, actionTypeEnum } = require('../constants');

async function comparePassword(hashPassword, password) {
  const isPasswordSame = await bcrypt.compare(password, hashPassword);

  if (!isPasswordSame) {
    throw new ApiError('Password is wrong', 400);
  }
}

async function hashPassword(password) {
  const waitPass = await bcrypt.hash(password, 10);
  return waitPass;
}

function generateTokenPair(encodeData = {}) {
  const access_token = jwt.sign(encodeData, ACCESS_TOKEN, { expiresIn: '15m' });
  const refresh_token = jwt.sign(encodeData, REFRESH_TOKEN, { expiresIn: '30m' });

  return {
    access_token,
    refresh_token
  }
}

function generateActionToken(encodeData = {}) {
  return jwt.sign(encodeData, ACTION_TOKEN, { expiresIn: '24h' });
}

function validateToken(token, tokenType = tokenTypeEnum.ACCESS) {
  try {
    let secretWord = ACCESS_TOKEN;

    if (tokenType === tokenTypeEnum.REFRESH) {
      secretWord = REFRESH_TOKEN
    }

    if (tokenType === actionTypeEnum.FORGOT_PASSWORD) {
      secretWord = ACTION_TOKEN
    }

    return jwt.verify(token, secretWord)
  } catch (e) {
    throw new ApiError(e.message || 'Invalid token', 401);
  }
}

module.exports = {
  comparePassword,
  hashPassword,
  generateTokenPair,
  validateToken,
  generateActionToken
}
