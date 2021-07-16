"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      "user_roles",
      [
        {
          userId: 1, // DEMO1
          roleId: 1, // ADMIN
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2, // DEMO2
          roleId: 2, // EDITOR
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("user_roles", null, {});
  },
};
