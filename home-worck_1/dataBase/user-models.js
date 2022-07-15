const { Schema, model } = require('mongoose');

const { userGenderEnum } = require('../constants');
const authService = require('../services/auth.services');

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
  phone: {
    type: String,
    trim: true,
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
}, {
  timestamps: true,
  toJSON: { virtuals: true, transform: _userTransorm },
  toObject: { virtuals: true, transform: _userTransorm }
});

User.virtual('fullName').get(function() {
  return this.name
});

User.statics = {
  async saveUserHashPassword(userToSave) {
    const hashPassword = await authService.hashPassword(userToSave.password);

    return this.create({ ...userToSave, password: hashPassword });
  }
};

User.methods = {
  chekIsPasswordSame(password) {
    console.log(password);
  },

  toRepresentation() {
    const user = this.toObject();
    delete user.password;

    return user;
  }
};

module.exports = model('User', User)

function _userTransorm(doc, ret) {
  delete ret.password;

  return ret;
}
