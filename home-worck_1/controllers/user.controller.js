const { modelUser } = require('../dataBase');
const { s3Service, userService } = require('../services');

module.exports = {
  getAllUsers: async (req, res, next) => {
    try {
      const paginationRespon = await userService.getUserWithcount(req.query);

      res.json(paginationRespon);
    } catch (e) {
      next(e);
    }
  },

  getUserById: (req, res, next) => {
    try {
      res.json(req.user);
    } catch (e) {
      next(e);
    }
  },

  createUser: async (req, res, next) => {
    try {
      const createUser = await modelUser.saveUserHashPassword(req.body);

      res.status(201).json(createUser);
    } catch (e) {
      next(e);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await modelUser.updateOne(
        { _id: userId },
        { $set: req.body },
        { new: true }
      );

      res.json(user);
    } catch (e) {
      next(e);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const { userId } = req.params;
      await modelUser.findByIdAndDelete(userId);

      res.json(`User was deleted successful`);
    } catch (e) {
      next(e);
    }
  },

  uploadUserPhoto: async (req, res, next) => {
    try {
      const avatar = req.files.avatar;
      const user = req.user;

      const result = await s3Service.ulpoudFile(avatar, 'user', user._id);

      res.json(result)
    } catch (e) {
      next(e);
    }
  }
  // TODO
  // getPhoto: async (req, res, next) => {
  //   try {
  //     const {key} = req.params;
  //     const result = await s3Service.getPhoto(key);

  //     res.json(result);
  //   } catch (e) {
  //     next();
  //   }
  // }  

}
