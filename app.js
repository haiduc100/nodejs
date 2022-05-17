const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const UserRouter = require("./router/userRouter");
const PostRouter = require("./router/postRouter");
const ProductRouter = require("./router/productRouter");
const CommentRouter = require("./router/commentRouter");
const checkLogin = require("./checkLogin");
const mongoose = require("mongoose");

app.use("/public", express.static(path.join(__dirname, "./public")));
app.use(cookieParser());

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "./view/User/home.html"));
});

// app.get("/",  (req, res) => {
//   res.sendFile(path.join(__dirname, "./view/"))

// });

// app.get("/user/:id", (req, res) => {
//   res.sendFile(path.join(__dirname, "./view/changePass.html"));
// });

app.get("/user/delete/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "./view/User/deleteUser.html"));
});


app.get("/user/login", (req, res) => {
  res.sendFile(path.join(__dirname, "./view/User/login.html"));
});
app.get("/user/change_password", (req, res) => {
  res.sendFile(path.join(__dirname, "./view/User/changePass.html"));
});

app.get("/user/:id/updateInfor", (req, res) => {
    res.sendFile(path.join(__dirname, "./view/User/changeInfor.html"));
});

app.get("/user/register", (req, res) => {
  res.sendFile(path.join(__dirname, "./view/User/register.html"));
});

app.get("/post/home", (req, res) => {
  res.sendFile(path.join(__dirname, "./view/Post/post.html"));
});

app.get("/post/user", checkLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "./view/Post/userPost.html"));
});

app.get("/post/create", (req, res) => {
  res.sendFile(path.join(__dirname, "./view/Post/create.html"));
});
// app.get("/post/home/:id", (req, res) => {
//   res.sendFile(path.join(__dirname, "./view/Post/update.html"));
// });

app.get("/post/user/:id", checkLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "./view/Post/userPost.html"));
});
app.get("/post/user/update/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "./view/Post/update.html"));
});

app.get("/comment/home/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "./view/Comment/comment.html"));
});

app.get("/comment/create", (req, res) => {
  res.sendFile(path.join(__dirname, "./view/Comment/create.html"));
});

app.get("/product/home",checkLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "/view/Product/product.html"));
});

app.get("/product/create", checkLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "/view/Product/create.html"));
});

app.get("/product/category/:category", checkLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "/view/Product/findByCategory.html"));
});
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());
// use router
app.use("/user", UserRouter);
app.use("/post", PostRouter);
app.use("/comment", CommentRouter);
app.use("/product", ProductRouter);

app.listen("4000", () => {
  mongoose.connect("mongodb://localhost/ExpressDemo");
  console.log("Server is running");
});