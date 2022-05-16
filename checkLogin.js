const UserModel = require("./models/user.model");
const jwt = require("jsonwebtoken");

checkLogin = (req, res, next) => {
  const cookies = req.cookies.user;
  if (cookies) {
    const userid = jwt.verify(cookies, "thai");
    UserModel.findOne({ _id: userid, token: cookies })
      .then((data) => {
        if (data) {
          req.role = data.role;
          next();
        } else {
          res.redirect("/user/login");
        }
      })
      .catch((err) => {
        res.json(err);
      });
  } else {
    res.redirect("/user/login");
  }
};

module.exports = checkLogin;
