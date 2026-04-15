const { Router } = require("express");
const {
  createUser,
  getAllUsers,
  updateUserById,
  deleteUserById
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
  roleMiddleware("create"),
  createUserValidator,
  Validate,
  createUser,
);

router.delete("/:id", authMiddleware, roleMiddleware("delete"), deleteUserById);

// admin and manager only routes

router.get("/", authMiddleware, roleMiddleware("list"), getAllUsers);
router.get("/:id", authMiddleware, roleMiddleware("view"), getUserById);
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("update"),
  updateUserValidator,
  Validate,
  updateUserById,
);

// users only routes 




module.exports = router;
