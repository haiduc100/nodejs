const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost/ExpressDemo");

const CommentSchema = mongoose.Schema(
  {
    content: String,
    idUser: {
      type: String,
      ref: "User",
    },
    idPost: {
      type: String,
      ref: "Post",
    },
  },
  { collection: "Comment" }
);

const CommentModel = mongoose.model("Comment", CommentSchema);

module.exports = CommentModel;
