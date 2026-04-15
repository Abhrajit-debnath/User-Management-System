const { Router } = require("express");
const {
  createUserController,
  getAllUsersController,
  updateUserByIdController,
  deleteUserByIdController,
  getProfileController,
  updateProfileController,
  getUserByIdController,
} = require("../controllers/users.controller.js");
const {
  createUserValidator,
  updateUserValidator,
} = require("../validators/user.validator.js");
const Validate = require("../middlewares/auth.middleware.js");
const roleMiddleware = require("../middlewares/role.middleware.js");
const authMiddleware = require("../middlewares/auth.middleware.js");
const router = Router();

//admin only routes

router.post(
  "/",
  authMiddleware,
  createUserValidator,
  Validate,
  roleMiddleware("create"),
  createUserController,
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("delete"),
  deleteUserByIdController,
);

// users only routes

router.get("/profile", authMiddleware, getProfileController);
router.put("/profile", authMiddleware, updateProfileController);



// admin and manager only routes

router.get("/", authMiddleware, roleMiddleware("list"), getAllUsersController);
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("view"),
  getUserByIdController,
);
router.put(
  "/:id",
  authMiddleware,
  updateUserValidator,
  Validate,
  roleMiddleware("update"),
  updateUserByIdController,
);



module.exports = router;
