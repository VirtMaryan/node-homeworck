const DB = require('../dataBase/users');

module.exports = {
  getAllUsers: (req, res) => {
    res.json(DB.usersArr);
  },

  getUserById: (req, res) => {
    const { userIndex } = req.params;

    res.json(DB.usersArr[userIndex]);
  },

  createUser: (req, res) => {
    DB.usersArr.push(req.body);

    res.json(DB.usersArr);
  },

  updateUser: (req, res) => {
    const { userIndex } = req.params;

    DB.usersArr.splice(userIndex, 1, req.body);

    res.json(DB.usersArr);
  },

  deleteUser: (req, res) => {
    const { userIndex } = req.params;

    DB.usersArr.splice(userIndex, 1);

    res.json(DB.usersArr);
  }
}