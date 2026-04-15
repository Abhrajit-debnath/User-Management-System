const { validationResult, checkSchema } = require("express-validator");

const loginValidator = checkSchema({
  email: {
    isEmail: true,
    errorMessage: "Valid email is required",
  },
  password: {
    isLength: {
      options: { min: 8 },
      errorMessage: "Password must be contain 8 characters",
    },
  },
});

module.exports = loginValidator;
