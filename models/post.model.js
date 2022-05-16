const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost/ExpressDemo");

const PostSchema = mongoose.Schema(
  {
    title: String,
    author: {
      type: String,
      ref: "User",
    },
    content: String,
  },
  { collection: "Post" }
);

const PostModel = mongoose.model("Post", PostSchema);

module.exports = PostModel;
