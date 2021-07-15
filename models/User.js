const bcrypt = require("bcrypt-nodejs");
const SALT_WORK_FACTOR = 12;

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "users",
      hooks: {
        beforeCreate: (user) => {
          // sequelize bug: if you use async code to change the password, attributes modified in hooks are not saved
          const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
          const hash = bcrypt.hashSync(user.password, salt, null);
          user.password = hash;
        },
      },
    }
  );

  User.prototype.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  return User;
};