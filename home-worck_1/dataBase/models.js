const { Schema, model } = require('mongoose');

const carTypesEnum = require('../constants/car-types.enum');
const userGenderEnum = require('../constants/user-gender.enum');

const User = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  age: {
    type: Number,
    default: 21
  },
  gender: {
    type: String,
    enum: Object.values(userGenderEnum),
    default: userGenderEnum.NEUTER
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true
  }
}, { timestamps: true });

const Car = new Schema({
  producer: {
    type: String,
    trim: true,
    lowercase: true,
    required: true
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

module.exports = {
  modelUser: model('User', User),
  modelCar: model('Car', Car)
}