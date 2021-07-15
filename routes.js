const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  createPermission,
  getPermissions,
  createRole,
  getRoles,
  addRoleToUser,
  getUserRoles,
  checkUserPermissions,
} = require("./controllers");
const { signupValidator, loginValidator } = require("./validators");
const { checkValidation } = require("./middlewares");

router.post("/signup", signupValidator, checkValidation, signup);

router.post("/login", loginValidator, checkValidation, login);

router.post("/permissions", createPermission);

router.get("/permissions", getPermissions);

router.post("/roles", createRole);

router.get("/roles", getRoles);

router.post("/users/:id/roles", addRoleToUser);

router.get("/users/:id/roles", getUserRoles);

router.post("/api/users/:id/permissions", checkUserPermissions);

module.exports = router;
