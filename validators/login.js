const { check } = require("express-validator");

const existOptions = { checkNull: true, checkFalsy: true };

module.exports = [
  check("username")
    .exists(existOptions)
    .withMessage("username is a required field"),
  check("password")
    .exists(existOptions)
    .withMessage("password is a required field."),
];
