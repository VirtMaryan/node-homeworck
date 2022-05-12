const bcrypt = require('bcrypt');

const { ApiError } = require('../error');

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

module.exports = {
  comparePassword,
  hashPassword
}
