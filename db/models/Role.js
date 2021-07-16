module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define(
    "Role",
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
      tableName: "roles",
    }
  );

  Role.associate = function (models) {
    Role.belongsToMany(models.User, {
      as: "users",
      through: "user_roles",
      foreignKey: "roleId",
    });

    Role.belongsToMany(models.Permission, {
      as: "permissions",
      through: "role_permissions",
      foreignKey: "roleId",
    });
  };

  return Role;
};
