const router = require("express").Router();
const {
  createPermission,
  getPermissions,
  createRole,
  getRoles,
  addRoleToUser,
  GetRolesAssignedToUser,
  checkUserPermissions,
} = require("../controllers");
const {
  permissionValidator,
  roleValidator,
  addUserRolesValidator,
  checkUserPermissionsValidator,
} = require("../validators");
const { checkValidation, tryCatchWrapper } = require("../middlewares");

router.post(
  "/permissions",
  permissionValidator,
  checkValidation,
  tryCatchWrapper(createPermission)
);

router.get("/permissions", tryCatchWrapper(getPermissions));

router.post(
  "/roles",
  roleValidator,
  checkValidation,
  tryCatchWrapper(createRole)
);

router.get("/roles", tryCatchWrapper(getRoles));

router.post(
  "/users/:id/roles",
  addUserRolesValidator,
  checkValidation,
  tryCatchWrapper(addRoleToUser)
);

router.get("/users/:id/roles", tryCatchWrapper(GetRolesAssignedToUser));

router.post(
  "/users/:id/permissions",
  checkUserPermissionsValidator,
  checkValidation,
  tryCatchWrapper(checkUserPermissions)
);

module.exports = router;
