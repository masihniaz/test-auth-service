"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("roles", [
      {
        name: "Admin",
        code: "ADMIN",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Editor",
        code: "EDITOR",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("roles", null, {});
  },
};
