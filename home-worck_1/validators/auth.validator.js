const Joi = require('joi');

const { constants } = require('../constants');


const loginSchema = Joi.object({
  email: Joi.string().regex(constants.EMAIL_REGEXP).required().trim().lowercase(),
  password: Joi.string().regex(constants.PASSWORD_REGEXP).required(),
});

const passworSchema = Joi.object({
  password: Joi.string().regex(constants.PASSWORD_REGEXP).required(),
});

const newPassworSchema = Joi.object({
  password: Joi.string().regex(constants.PASSWORD_REGEXP).required(),
  newPassword: Joi.string().regex(constants.PASSWORD_REGEXP).required(),
});

const emailSchema = Joi.object({
  email: Joi.string().regex(constants.EMAIL_REGEXP).required().trim().lowercase(),
});

module.exports = {
  loginSchema,
  emailSchema,
  passworSchema,
  newPassworSchema
}
