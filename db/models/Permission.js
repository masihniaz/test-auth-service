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

  return Permission;
};
