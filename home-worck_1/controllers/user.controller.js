const { modelUser } = require('../dataBase');
const { ApiError } = require('../error');
const { authService } = require('../services');

module.exports = {
  getAllUsers: async (req, res, next) => {
    try {
      const { limit = 20, page = 1 } = req.query;

      if (limit <= 0 || page <= 0) {
        next(new ApiError('Limit or page not valid', 400));
        return;
      }

      const skip = (page - 1) * limit;

      const users = await modelUser.find().limit(limit).skip(skip);
      const count = await modelUser.count({});

      res.json({
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
      res.json(req.user);
    } catch (e) {
      next(e);
    }
  },

  createUser: async (req, res, next) => {
    try {
      const hashPassword = await authService.hashPassword(req.body.password);
      const createUser = await modelUser.create({ ...req.body, password: hashPassword });

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
  }
}
