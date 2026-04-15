const { Router } = require("express");
const { createUser,getAllUsers } = require("../controllers/users.controller.js");
const { createUserValidator } = require("../validators/user.validator.js");
const { createUserValidate } = require("../middleware/validate.middleware.js");
const roleMiddleware = require("../middleware/role.middleware.js");
const authMiddleware = require("../middlewares/auth.middleware.js");
const router = Router();

//admin only routes

router.post(
  "/",
  authMiddleware,
  roleMiddleware("create"),
  createUserValidator,
  createUserValidate,
  createUser,
);

// admin and manager only routes 

router.get(
  "/",
  authMiddleware,
  roleMiddleware("list"),
  getAllUsers,
);

module.exports = router;
