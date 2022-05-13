const Joi = require('joi');

const { constants } = require('../constants');

const userBroSubSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(150).required().trim(),
  age: Joi.number().integer().min(1).max(130)
});

const joinUserSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(150).required().trim(),
  email: Joi.string().regex(constants.EMAIL_REGEXP).required().trim().lowercase(),
  age: Joi.number().integer().min(1).max(130),
  gender: Joi.string().valid('female', 'male', 'neuter'),
  password: Joi.string().regex(constants.PASSWORD_REGEXP).required(),
  brothers: Joi.array().min(1).items(userBroSubSchema)
});

const joiUserUpdateSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(150).trim(),
  email: Joi.string().regex(constants.EMAIL_REGEXP).trim().lowercase(),
  age: Joi.number().integer().min(1).max(130),
  gender: Joi.string().valid('female', 'male', 'neuter')
})

module.exports = {
  joinUserSchema,
  joiUserUpdateSchema
}
