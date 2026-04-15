const { validationResult } = require("express-validator");

const authValidate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return res.status(400).json({
      success: false,
      message: "validatoin failed",
      errors: errors,
    });
  }
  next();
};

const createUserValidate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return res.status(400).json({
      success: false,
      message: "validatoin failed",
      errors: errors,
    });
  }
  next();
};

module.exports = {authValidate,createUserValidate};
