const userModel = require("./users-model");

function validatePayload(req, res, next) {
  try {
    let { username, password } = req.body;
    if (!username || !password) {
      res
        .status(400)
        .json({ message: "Lütfen girilen bilgileri kontrol ediniz!.." });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

function validateUserNameIsUnique(req, res, next) {
  try {
    let { username } = req.body;
    const isExist = userModel
      .getAllUsers()
      .find((item) => item.username === username);
    if (isExist) {
      res
        .status(400)
        .json({
          message:
            "Bu kullanıcı adı mevcuttur, lütfen başka bir kullanıcı adı seçiniz!..",
        });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

function validateLogin(req, res, next) {
  try {
    let { username, password } = req.body;
    const isExist = userModel
      .getAllUsers()
      .find((item) => item.username === username && item.password === password);
    if (!isExist) {
      res.status(400).json({
        message: "Girilen bilgiler hatalıdır, lütfen kontrol ediniz!..",
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  validatePayload,
  validateLogin,
  validateUserNameIsUnique,
};
