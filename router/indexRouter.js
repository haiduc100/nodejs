const router = require("express").Router();
const checkLogin = require("../checkLogin");
const path = require("path");

router.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "../view/User/home.html"));
});

router.get("/user/delete/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "../view/User/deleteUser.html"));
});

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../view/User/login.html"));
});
router.get("/change_password", (req, res) => {
  res.sendFile(path.join(__dirname, "../view/User/changePass.html"));
});

router.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../view/User/register.html"));
});



router.get("/comment/home/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "../view/Comment/comment.html"));
});

router.get("/comment/create", (req, res) => {
  res.sendFile(path.join(__dirname, "../view/Comment/create.html"));
});

router.get("/product/home", checkLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "/view/Product/product.html"));
});

router.get("/product/create", checkLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "/view/Product/create.html"));
});

router.get("/product/category/:category", checkLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "/view/Product/findByCategory.html"));
});

module.exports = router;
