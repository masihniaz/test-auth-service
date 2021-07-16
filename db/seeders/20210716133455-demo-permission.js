"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("permissions", [
      {
        name: "Create User",
        code: "CREATE_USER",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Update User",
        code: "UPDATE_USER",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Delete User",
        code: "DELETE_USER",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "View User",
        code: "VIEW_USER",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("permissions", null, {});
  },
};
