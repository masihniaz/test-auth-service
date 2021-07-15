const { check } = require("express-validator");

const existOptions = { checkNull: true, checkFalsy: true };

module.exports = [
  check("permissionIds")
    .exists(existOptions)
    .withMessage("permissionIds is a required field")
    .isArray({ min: 1 })
    .withMessage("at least one permission ID should be available"),
];
