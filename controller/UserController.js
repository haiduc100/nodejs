const UserModel = require("../models/user.model");

checkDuplicate = (req, res, next) => {
  UserModel.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        res.json({
          message: "User already exists!",
          status: 400,
          err: false,
        });
      } else {
        next();
      }
    })
    .catch((err) => {
      res.json({ message: "Error server", status: 500, err: err });
    });
};

module.exports = checkDuplicate;
