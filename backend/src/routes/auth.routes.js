const { Router } = require("express");
const  login  = require("../controllers/auth.controller.js");
const loginValidator = require("../validators/auth.validator.js");
const validate = require("../middleware/validate.middleware.js");
const router = Router();

router.post("/login", loginValidator, validate, login);

module.exports = router;
