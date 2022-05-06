const { modelUser } = require('../dataBase/models');

const checkCreateUsers = async (req, res, next) => {
  try {
    const { email = '', name } = req.body;

    if (!name) {
      res.json('Name is required');
      return;
    };

    if (!email) {
      res.json('Email is required');
      return
    };

    const userIsPresent = await modelUser.findOne({ email: email.toLowerCase().trim() });

    if (userIsPresent) {
      res.status(409).json('User with whis email exists');
      return;
    };

    next();
  } catch (e) {
    res.json(e)
  }
};

const chekGetUserById = async (req, res, next) => {
  try {

    const { userId } = req.params;
    const user = await modelUser.findById(userId);

    if (!user) {
      res.json('User by Id not foynded');
      return
    }

    next();
  } catch (e) {
    res.json(e)
  }
};

const chekDeleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await modelUser.findOne({ _id: userId });

    if (!user) {
      res.status(404).json(`User with id ${userId} not found`);
      return;
    };

  } catch (e) {
    res.json(e)
  };
  next()
};

chekUpdateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await modelUser.findOne({ _id: userId });

    if (!user) {
      res.status(404).json(`User with id ${userId} not found`);
      return;
    };

    next();
  } catch (e) {
    res.json(e)
  }
};

module.exports = {
  checkCreateUsers,
  chekGetUserById,
  chekDeleteUser,
  chekUpdateUser
}