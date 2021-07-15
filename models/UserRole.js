module.exports = (sequelize, Sequelize) => {
  const UserRole = sequelize.define(
    "UserRole",
    {
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "user_roles",
    }
  );

  return UserRole;
};
