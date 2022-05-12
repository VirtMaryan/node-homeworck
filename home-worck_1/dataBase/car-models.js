const { Schema, model } = require('mongoose');

const { carTypesEnum } = require('../constants');

const Car = new Schema({
  producer: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: Object.values(carTypesEnum),
    default: carTypesEnum.SEDAN
  },
  year: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = model('Car', Car)
