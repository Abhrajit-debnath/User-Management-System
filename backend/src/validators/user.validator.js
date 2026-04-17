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
    isIn: {
      options: [["manager", "admin", "user"]],
      errorMessage: "Invalid role",
    },
    notEmpty: {
      errorMessage: "Role is required",
    },
  },
  status: {
    isIn: {
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
const updateUserValidator = checkSchema({
  email: {
    isEmail: true,
    errorMessage: "Valid email is required",
    optional: true,
    notEmpty: {
      errorMessage: "Email is required",
    },
  },
  name: {
    optional: true,
    notEmpty: {
      errorMessage: "Name is required",
    },
  },
  role: {
    optional: true,
    isIn: {
      options: [["manager", "admin", "user"]],
      errorMessage: "Invalid role",
    },
    notEmpty: {
      errorMessage: "Role is required",
    },
  },
  status: {
    optional: true,
    isIn: {
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

module.exports = { createUserValidator, updateUserValidator };
