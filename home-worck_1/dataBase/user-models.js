const { Schema, model } = require('mongoose');

const { userGenderEnum } = require('../constants');

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
  },
  password: {
    type: String,
    required: true,
    default: null,
    select: false
  },
  brothers: {}
}, { timestamps: true });

module.exports = model('User', User)
