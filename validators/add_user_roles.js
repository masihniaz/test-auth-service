const { check } = require("express-validator");

const existOptions = { checkNull: true, checkFalsy: true };

module.exports = [
  check("roleIds")
    .exists(existOptions)
    .withMessage("roleIds is a required field")
    .isArray({ min: 1 })
    .withMessage("at least one role ID should be available"),
];
