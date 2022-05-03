const DB = require('../dataBase/users');

module.exports = {
  getAllUsers: (req, res) => {
    res.json(DB.usersArr);
  },

  getUserById: (req, res) => {
    const { userIndex } = req.params;
    const user = DB.usersArr[userIndex];

    if (!user) {
      res.status(404).json(`User with id ${userIndex} not found`);
      return;
    };

    res.json(user);
  },

  createUser: (req, res) => {
    DB.usersArr.push(req.body);

    res.json(DB.usersArr);
  },

  updateUser: (req, res) => {
    const { userIndex } = req.params;
    const user = DB.usersArr[userIndex];

    if (!user) {
      res.status(404).json(`User with id ${userIndex} not found`);
      return;
    };

    DB.usersArr.splice(userIndex, 1, req.body);

    res.json(DB.usersArr);
  },

  deleteUser: (req, res) => {
    const { userIndex } = req.params;
    const user = DB.usersArr[userIndex];

    if (!user) {
      res.status(404).json(`User with id ${userIndex} not found`);
      return;
    };

    DB.usersArr.splice(userIndex, 1);

    res.json(DB.usersArr);
  }
}