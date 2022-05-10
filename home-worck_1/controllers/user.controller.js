const modelUser = require('../dataBase/user-models');

module.exports = {
  getAllUsers: async (req, res, next) => {
    try {
      const { limit = 20, page = 1 } = req.query;
      const skip = (page - 1) * limit;

      const users = await modelUser.find().limit(limit).skip(skip);
      const count = await modelUser.count({});

      res.status(200)
        .json({
          page,
          perPage: limit,
          data: users,
          count
        });

    } catch (e) {
      next(e);
    }
  },

  getUserById: (req, res, next) => {
    try {
      res.status(200).json(req.user);
    } catch (e) {
      next(e);
    }
  },

  createUser: async (req, res, next) => {
    try {
      const createUser = await modelUser.create(req.body);

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

      res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await modelUser.findByIdAndDelete(userId);

      res.status(200).json(`User was deleted successful`);
    } catch (e) {
      next(e);
    }
  }
}