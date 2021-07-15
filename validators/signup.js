const { check } = require("express-validator");

const existOptions = { checkNull: true, checkFalsy: true };

module.exports = [
  check("username")
    .exists(existOptions)
    .withMessage("username is a required field.")
    .isString()
    .withMessage("username must be a string."),
  check("email")
    .exists(existOptions)
    .withMessage("email is a required field")
    .isEmail()
    .withMessage("email address is invalid."),
  check("password")
    .exists(existOptions)
    .withMessage("password is a required field.")
    .isLength({ min: 5 })
    .withMessage("password must be at least 5 characters."),
];
