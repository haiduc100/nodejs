const router = require("express").Router();
const PostModel = require("../models/post.model");
const CommentModel = require("../models/comment.model");
const UserModel = require("../models/user.model");

// get all comment
router.get("/", (req, res) => {
  CommentModel.find()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

// get comment by idPost
router.get("/:id", (req, res) => {
  CommentModel.find({ idPost: req.params.id })
    .populate("idUser")
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});
router.post("/", (req, res) => {
  CommentModel.create(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.delete("/:id", (req, res) => {
  CommentModel.findOne({ _id: req.params.id })
    .populate("idUser")
    .populate({ path: "idPost", populate: { path: "author" } })
    .then((data) => {
      if (
        (data.idUser.username === req.body.username &&
          data.idUser.password === req.body.password) ||
        (data.idPost.author.username === req.body.username &&
          data.idPost.author.password === req.body.password)
      ) {
        return CommentModel.deleteOne({ _id: req.params.commentid });
      } else {
        res.json({
          mes: "username, password không khớp với chủ post hoặc chủ comment",
          status: 400,
        });
      }
      res.json(data);
    })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.put("/:id", (req, res) => {
  CommentModel.findOne({ _id: req.params.id })
    .populate("idUser")
    .then((comment) => {
      if (
        comment.idUser.username === req.body.username &&
        comment.idUser.password === req.body.password
      ) {
        return CommentModel.updateOne(
          { _id: req.params.id },
          { content: req.body.content }
        );
      } else {
        res.send(
          "username, password không khớp với chủ comment thì mới sửa comment"
        );
      }
    })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});
module.exports = router;
