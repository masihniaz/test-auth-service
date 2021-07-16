"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("role_permissions", [
      {
        roleId: 1, // ADMIN
        permissionId: 1, // CREATE
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 1, // ADMIN
        permissionId: 2, // EDIT
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 1, // ADMIN
        permissionId: 3, // DELETE
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 1, // ADMIN
        permissionId: 4, // VIEW
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 2, // EDITOR
        permissionId: 1, // CREATE
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 2, // EDITOR
        permissionId: 2, // EDIT
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 2, // EDITOR
        permissionId: 4, // VIEW
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("role_permissions", null, {});
  },
};
