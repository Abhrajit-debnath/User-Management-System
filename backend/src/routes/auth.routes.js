const { Router } = require("express");
const  login  = require("../controllers/auth.controller.js");
const {loginValidator} = require("../validators/auth.validator.js");
const Validate = require("../middlewares/validate.middleware.js");
const router = Router();

router.post("/login", loginValidator,  Validate, login);

module.exports = router;
