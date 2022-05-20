const Joi = require('joi');

const { constants } = require('../constants');


const loginSchema = Joi.object({
  email: Joi.string().regex(constants.EMAIL_REGEXP).required().trim().lowercase(),
  password: Joi.string().regex(constants.PASSWORD_REGEXP).required(),
})

module.exports = {
  loginSchema
}
