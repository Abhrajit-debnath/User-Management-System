const { checkSchema } = require("express-validator");

const createUserValidator = checkSchema({
  email: {
    isEmail: true,
    errorMessage: "Valid email is required",
    notEmpty: {
      errorMessage: "Email is required",
    },
  },
  name: {
    notEmpty: {
      errorMessage: "Name is required",
    },
  },
  role: {
    isin: {
      options: [["manager", "admin", "user"]],
      errorMessage: "Invalid role",
    },
    notEmpty: {
      errorMessage: "Role is required",
    },
  },
  status: {
    isin: {
      options: [["active", "inactive"]],
      errorMessage: "Invalid status",
    },
    notEmpty: {
      errorMessage: "Role is required",
    },
  },
  password: {
    optional: true,
    isLength: {
      options: { min: 8 },
      errorMessage: "Password must be at least 8 character long",
    },
  },
});

module.exports = {createUserValidator};
