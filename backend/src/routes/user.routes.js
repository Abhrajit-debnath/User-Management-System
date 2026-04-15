const { Router } = require("express");
const {
  createUser,
  getAllUsers,
  updateUserById,
  deleteUserById,
  getProfile,
  updateProfile,
} = require("../controllers/users.controller.js");
const {
  createUserValidator,
  updateUserValidator,
} = require("../validators/user.validator.js");
const { Validate } = require("../middleware/validate.middleware.js");
const roleMiddleware = require("../middleware/role.middleware.js");
const authMiddleware = require("../middlewares/auth.middleware.js");
const router = Router();

//admin only routes

router.post(
  "/",
  authMiddleware,
  createUserValidator,
  Validate,
  roleMiddleware("create"),
  createUser,
);

router.delete("/:id", authMiddleware, roleMiddleware("delete"), deleteUserById);

// admin and manager only routes

router.get("/", authMiddleware, roleMiddleware("list"), getAllUsers);
router.get("/:id", authMiddleware, roleMiddleware("view"), getUserById);
router.put(
  "/:id",
  authMiddleware,
  updateUserValidator,
  Validate,
  roleMiddleware("update"),
  updateUserById,
);

// users only routes

router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);

module.exports = router;
