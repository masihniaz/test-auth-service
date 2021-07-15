const router = require("express").Router();
const {
  createPermission,
  getPermissions,
  createRole,
  getRoles,
  addRoleToUser,
  getUserRoles,
  checkUserPermissions,
} = require("../controllers");
const {
  permissionValidator,
  roleValidator,
  addUserRolesValidator,
  checkUserPermissionsValidator,
} = require("../validators");
const { checkValidation } = require("../middlewares");

router.post(
  "/permissions",
  permissionValidator,
  checkValidation,
  createPermission
);

router.get("/permissions", getPermissions);

router.post("/roles", roleValidator, checkValidation, createRole);

router.get("/roles", getRoles);

router.post(
  "/users/:id/roles",
  addUserRolesValidator,
  checkValidation,
  addRoleToUser
);

router.get("/users/:id/roles", getUserRoles);

router.post(
  "/users/:id/permissions",
  checkUserPermissionsValidator,
  checkValidation,
  checkUserPermissions
);

module.exports = router;
