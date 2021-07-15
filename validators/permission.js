const { check } = require("express-validator");

const existOptions = { checkNull: true, checkFalsy: true };

module.exports = [
  check("code").exists(existOptions).withMessage("code is a required field"),
  check("name").exists(existOptions).withMessage("name is a required field."),
];
