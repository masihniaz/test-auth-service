module.exports = (sequelize, Sequelize) => {
  const Permission = sequelize.define(
    "Permission",
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "permissions",
    }
  );

  Permission.associate = function (models) {
    // Permission belongs to many roles
    // Permission.belongsToMany(models.Role, {
    //   as: "roles",
    //   through: "role_permissions",
    //   foreignKey: "permissionId",
    // });
  };

  return Permission;
};
