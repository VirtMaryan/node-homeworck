const Joi = require('joi');

const { constants } = require('../constants');

const joiCarSchema = Joi.object({
  producer: Joi.string().alphanum().min(2).required().trim().lowercase(),
  year: Joi.number().integer().min(constants.CURRENT_YEAR - 50).max(constants.CURRENT_YEAR).required(),
  type: Joi.string().valid('sedan', 'hatchback', 'suv')
});

module.exports = {
  joiCarSchema
}
