"use strict";
const bcrypt = require("bcrypt-nodejs");

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("users", [
      {
        username: "demo1", // ADMIN
        email: "demo1@example.com",
        password: bcrypt.hashSync("password", bcrypt.genSaltSync(10)),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "demo2", // EDITOR
        email: "demo2@example.com",
        password: bcrypt.hashSync("password", bcrypt.genSaltSync(10)),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
