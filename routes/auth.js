const router = require("express").Router();
const { signup, login } = require("../controllers");
const { signupValidator, loginValidator } = require("../validators");
const { checkValidation } = require("../middlewares");

router.post("/signup", signupValidator, checkValidation, signup);

router.post("/login", loginValidator, checkValidation, login);

module.exports = router;
