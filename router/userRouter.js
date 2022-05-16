const UserModel = require("../models/user.model");

const path = require("path");
const router = require("express").Router();
const checkDuplicate = require("../controller/UserController");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
    try {
        const data = await UserModel.find({});
        console.log(data);
        res.json(data);
    } catch (err) {
        res.json(err);
    }
});

// router.get("/", async (req, res) => {
//   const data = await UserModel.find({});
//   console.log(data);

// });

router.get("/page", async (req, res) => {
    try {
        const user = await UserModel.find({})
            .skip((req.query.page - 1) * 5)
            .limit(parseInt(req.query.qual));

        res.json(user);
    } catch (error) {
        res.json(error);
    }
});
router.get("/pagination", (req, res) => {
    res.sendFile(path.join(__dirname, "../view/pagination.html"));
});

// find by id
router.get("/:id", async (req, res) => {
    try {
        const user = await UserModel.findOne({_id: req.params.id});
        res.json(user);
    } catch (error) {
        res.json(error);
    }
});

// find by username
router.get("/username/:username", (req, res) => {
    UserModel.findOne({username: req.params.username})
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            res.json(err);
        });
});

router.post("/login", async (req, res) => {
    try {
        const data = await UserModel.findOne({
            username: req.body.user,
        });
        if (data) {
            const checkPass = await bcrypt.compare(req.body.pass, data.password);

            if (checkPass) {
                const userID = data._id;
                const token = jwt.sign(`${userID}`, "thai");
                await UserModel.updateOne({_id: data._id}, {token: token});

                res.cookie("user", token, {
                    expires: new Date(Date.now() + 6000000),
                });
                res.json({
                    message: "login successfully!",
                    status: 200,
                    err: false,
                    userid: userID,
                });
            } else {
                res.json({message: "Incorrect password!!!"});
            }
        } else {
            res.json({message: "login failed", status: 400, err: false});
        }
    } catch (error) {
        res.json({message: "Error server", status: 500, err: error});
    }
});

router.post("/register", checkDuplicate, async (req, res) => {
    try {
        const password = await bcrypt.hash(req.body.password, 10);
        await UserModel.create({
            username: req.body.username,
            password: password,
            role: req.body.role
        });
        // console.log(91,data);
        res.json({
            message: "Create user successfully",
            status: 200,
            err: false,
        });
    } catch (error) {
        res.json({message: "Error server", status: 500, err: error});
    }
});

router.post("/", (req, res) => {
    UserModel.findOne({
        username: req.body.username,
    })
        .then((data) => {
            if (data) {
                res.json({message: "User already exist!"});
            } else {
                return UserModel.create(req.body);
            }
        })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(err);
        });
});

router.put(
    "/:id",
    (req, res, next) => {
        UserModel.findOne({_id: req.params.id})
            .then((user) => {
                if (user == null) {
                    res.json({message: "Do not exist user", status: 400});
                } else {
                    req.user = user;
                    next();
                }
            })
            .catch((err) => {
                res.json(err);
            });
    },
    (req, res) => {
        if (
            req.user.username === req.body.username &&
            req.user.password === req.body.password
        ) {
            UserModel.updateOne(
                {_id: req.params.id},
                {password: req.body.newpassword}
            )
                .then(() => {
                    res.json({message: "thanh cong", status: 200});
                })
                .catch((err) => {
                    res.json({message: "khong thanh cong", status: 400, err: err});
                });
        } else {
            res.json({message: "sai password", status: 400});
        }
    }
);

router.delete("/:id", (req, res) => {
    UserModel.findOne({
        username: req.body.username,
        password: req.body.password,
    })
        .then((user) => {
            if (!user) {
                res.send("User is not found!");
            } else {
                return UserModel.deleteOne({_id: req.params.id});
            }
        })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.send(err);
        });
});

module.exports = router;
