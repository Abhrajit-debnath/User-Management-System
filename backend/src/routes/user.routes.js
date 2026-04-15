const { Router } = require("express");
const { createUser } = require("../controllers/users.controller.js");
const { createUserValidator } = require("../validators/user.validator.js");
const { createUserValidate } = require("../middleware/validate.middleware.js");
const roleMiddleware = require("../middleware/role.middleware.js");
const authMiddleware = require("../middlewares/auth.middleware.js");

const router = Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("create"),
  createUserValidator,
  createUserValidate,
  createUser,
);

module.exports = router;
