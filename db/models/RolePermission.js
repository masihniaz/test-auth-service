module.exports = (sequelize, Sequelize) => {
  const RolePermission = sequelize.define(
    "RolePermission",
    {
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      permissionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "role_permissions",
    }
  );

  return RolePermission;
};
