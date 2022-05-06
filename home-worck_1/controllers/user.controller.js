const { modelUser } = require('../dataBase/models');

module.exports = {
  getAllUsers: async (req, res) => {
    const users = await modelUser.find();

    res.json(users);
  },

  getUserById: async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await modelUser.findById(userId);

      res.json(user);
    } catch (e) {
      res.json(e)
    }
  },

  createUser: async (req, res) => {
    try {
      const createUser = await modelUser.create(req.body);

      res.status(201).json(createUser);
    } catch (e) {
      res.json(e);
    }
  },

  updateUser: async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await modelUser.findOneAndUpdate(
        userId,
        { age: 202 },
        { new: true }
      );

      res.json(user);
    } catch (e) {
      res.json(e)
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await modelUser.findByIdAndDelete(userId);

      res.json(user);
    } catch (e) {
      res.json(e)
    }
  }
}