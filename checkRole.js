const UserModel = require("./models/user.model");

checkRole = async (req, res, next) => {
  try {
    const role = await req.role
    if (role == 0) {
      next()
    } else {
      res.json("You must have permission admin to view this page")
    }

  } catch (e) {
    res.json(e)
  }
}

module.exports = checkRole;