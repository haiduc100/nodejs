const router = require("express").Router();
const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");

router.get("/", (req, res) => {
  PostModel.find({})
    .populate("author")
    .then((post) => {
      res.json(post);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/pagination", (req, res) => {
  PostModel.find()
    .populate("author")
    .skip(req.query.skip)
    .limit(req.query.limit)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

// find post by author name
router.get("/:username", (req, res) => {
  // nó se vào thằng này
  UserModel.findOne({ username: req.params.username })
    .then((user) => {
      if (user) {
        return PostModel.find({ author: user._id }).populate("author");
      } else {
        res.send("User name not found");
      }
    })
    .then((post) => {
      res.json(post);
    })
    .catch((err) => {
      res.json(err);
    });
});

//find post by user id
router.get("/userpost/:userid", (req, res) => {
  PostModel.find({ author: req.params.userid })
    .populate("author")
    .then((post) => {
      res.json(post);
    })
    .catch((err) => {
      res.json(err);
    });
});

// find post by post id
router.get("/:id", (req, res) => {
  PostModel.findOne({ _id: req.params.id })
    .populate("author")
    .then((post) => {
      res.json(post);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/", (req, res) => {
  PostModel.create(req.body)
    .then((post) => {
      res.json(post);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/:id", (req, res) => {
  PostModel.updateOne({ _id: req.params.id }, req.body)
    .then((post) => {
      res.json(post);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.delete("/:id", (req, res) => {
  PostModel.deleteOne({
    _id: req.params.id,
  })
    .then((post) => {
      res.json(post);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
