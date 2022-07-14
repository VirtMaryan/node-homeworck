const axios = require('axios');

const { modelUser } = require('../dataBase');
const { s3Service, userService, cacheService } = require('../services');
const { ApiError } = require('@error');

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
      
      cacheService.deleteEndpointCashe(req.originalUrl);
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
  },
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

  getUserFromRedsi: async (req, res, next) => {
    try {
      const users = [];

      for await (const key of cacheService.client.scanIterator()) {
        const user = await cacheService.client.get(key);
        users.push(user);
      }

      res.json(users);
    } catch (e) {
      next(e);
    }
  },

  setUserToRedis: async (req, res, next) => {
    try {
      const { name } = req.body;
      await cacheService.client.set(name, JSON.stringify(req.body));

      res.json('user was created');
    } catch (e) {
      next(e);
    }
  },

  getUserByNameFromRedsi: async (req, res, next) => {
    try {
      const { name } = req.params;

      const user = await cacheService.client.get(name);

      if (!user) {
        return next(new ApiError('user not found', 404));
      }

      res.json(JSON.parse(user));
    } catch (e) {
      next(e);
    }
  },

  getJSONusers: async (req, res, next) => {
    try {
      const photos = await axios.get('https://jsonplaceholder.typicode.com/photos')

      res.json(photos.data);
    } catch (e) {
      next(e);
    }
  }

}
