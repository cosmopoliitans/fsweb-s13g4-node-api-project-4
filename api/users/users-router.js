const router = require("express").Router();
const mw = require("./users-middleware");
const userModel = require("./users-model");

router.get("/users", (req, res, next) => {
  try {
    const allUsers = userModel.getAllUsers();
    res.json(allUsers);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/register",
  mw.validatePayload,
  mw.validateUserNameIsUnique,
  (req, res, next) => {
    try {
      const insertUser = userModel.insertUser({
        username: req.body.username,
        password: req.body.password,
      });
      res.status(201).json(insertUser);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/login", mw.validateLogin, (req, res, next) => {
  try {
    res.json({ message: `Hoşgeldiniz ${req.body.username}` });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
