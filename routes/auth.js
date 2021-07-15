const router = require("express").Router();
const { signup, login } = require("../controllers");
const { signupValidator, loginValidator } = require("../validators");
const { checkValidation, tryCatchWrapper } = require("../middlewares");

router.post(
  "/signup",
  signupValidator,
  checkValidation,
  tryCatchWrapper(signup)
);

router.post("/login", loginValidator, checkValidation, tryCatchWrapper(login));

module.exports = router;
