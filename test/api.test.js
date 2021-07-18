const { app, server } = require("../app.js");
const chai = require("chai");
const request = require("supertest");
const expect = chai.expect;

describe("API Tests", () => {
  let access_token;

  describe("Signup", () => {
    it("Should be able to sign up with correct information", (done) => {
      const payload = {
        username: "demo",
        email: "demo@gmail.com",
        password: "password",
      };
      request(app)
        .post("/api/signup")
        .send(payload)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property("id");
          expect(res.body).to.have.property("username", payload.username);
          expect(res.body).to.have.property("email", payload.email);
          done();
        });
    });

    it("Should respond with error if required request body parameters are missing", (done) => {
      const payload = {};
      request(app)
        .post("/api/signup")
        .send(payload)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property("errors");
          done();
        });
    });

    it("Should respond with error if username or email exist", (done) => {
      const payload = {
        username: "demo",
        email: "demo@gmail.com",
        password: "password",
      };
      request(app)
        .post("/api/signup")
        .send(payload)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body).to.have.property(
            "error",
            `User with email address: "${payload.email}" or username: "${payload.username}" already exists`
          );
          done();
        });
    });
  });

  // ------------------------------------------------------------------------------------------------------------------------------------

  describe("Login", () => {
    it("Should be able to login with correct credentials", (done) => {
      const payload = { username: "demo", password: "password" };
      request(app)
        .post("/api/login")
        .send(payload)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property("access_token");
          access_token = res.body.access_token;
          done();
        });
    });
    it("Should not be able to login with incorrect credentials", (done) => {
      const payload = { username: "demo", password: "wrongpassword" };
      request(app)
        .post("/api/login")
        .send(payload)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.property(
            "error",
            "Incorrect username or password."
          );
          done();
        });
    });
    it("Should respond with error if required request body parameters are missing", (done) => {
      const payload = {};
      request(app)
        .post("/api/login")
        .send(payload)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property("errors");
          done();
        });
    });
  });

  // ------------------------------------------------------------------------------------------------------------------------------------

  describe("Create Permission", () => {
    it("Should respond with error if authorization header is not set", (done) => {
      const payload = { code: "CREATE_USER", name: "Create User" };
      request(app)
        .post("/api/permissions")
        .send(payload)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });

    it('Should be able to create "CREATE_USER" permission', (done) => {
      const payload = { code: "CREATE_USER", name: "Create User" };
      request(app)
        .post("/api/permissions")
        .set("Authorization", `Bearer ${access_token}`)
        .send(payload)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property("id");
          expect(res.body).to.have.property("code", payload.code);
          expect(res.body).to.have.property("name", payload.name);
          done();
        });
    });

    it('Should be able to create "UPDATE_USER" permission', (done) => {
      const payload = { code: "UPDATE_USER", name: "Update User" };
      request(app)
        .post("/api/permissions")
        .set("Authorization", `Bearer ${access_token}`)
        .send(payload)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property("id");
          expect(res.body).to.have.property("code", payload.code);
          expect(res.body).to.have.property("name", payload.name);
          done();
        });
    });

    it('Should be able to create "DELETE_USER" permission', (done) => {
      const payload = { code: "DELETE_USER", name: "Delete User" };
      request(app)
        .post("/api/permissions")
        .set("Authorization", `Bearer ${access_token}`)
        .send(payload)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property("id");
          expect(res.body).to.have.property("code", payload.code);
          expect(res.body).to.have.property("name", payload.name);
          done();
        });
    });

    it('Should be able to create "VIEW_USER" permission', (done) => {
      const payload = { code: "VIEW_USER", name: "View User" };
      request(app)
        .post("/api/permissions")
        .set("Authorization", `Bearer ${access_token}`)
        .send(payload)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property("id");
          expect(res.body).to.have.property("code", payload.code);
          expect(res.body).to.have.property("name", payload.name);
          done();
        });
    });

    it("Should respond with error if permission exist", (done) => {
      const payload = { code: "CREATE_USER", name: "Create User" };
      request(app)
        .post("/api/permissions")
        .set("Authorization", `Bearer ${access_token}`)
        .send(payload)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body).to.have.property(
            "error",
            `Permission with name: "${payload.name}" or code: "${payload.code}" already exists`
          );
          done();
        });
    });

    it("Should respond with error if required request body parameters are missing", (done) => {
      const payload = {};
      request(app)
        .post("/api/permissions")
        .set("Authorization", `Bearer ${access_token}`)
        .send(payload)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property("errors");
          done();
        });
    });
  });

  // ------------------------------------------------------------------------------------------------------------------------------------

  describe("Get Permissions", () => {
    it("Should respond with error if authorization header is not set", (done) => {
      request(app)
        .get("/api/permissions")
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });

    it("Should get all available permissions", (done) => {
      request(app)
        .get("/api/permissions")
        .set("Authorization", `Bearer ${access_token}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.length).to.be.greaterThan(0);
          expect(res.body[0]).to.have.property("id");
          expect(res.body[0]).to.have.property("code");
          expect(res.body[0]).to.have.property("name");
          done();
        });
    });
  });

  // ------------------------------------------------------------------------------------------------------------------------------------

  describe("Create Role", () => {
    it("Should respond with error if authorization header is not set", (done) => {
      const payload = {
        code: "ADMIN",
        name: "Admin",
        permissionIds: [1, 2, 3, 4],
      };
      request(app)
        .post("/api/roles")
        .send(payload)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });

    it("Should respond with error if required request body parameters are missing", (done) => {
      const payload = {};
      request(app)
        .post("/api/roles")
        .set("Authorization", `Bearer ${access_token}`)
        .send(payload)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property("errors");
          done();
        });
    });

    it('Should be able to create "ADMIN" role', (done) => {
      const payload = {
        code: "ADMIN",
        name: "Admin",
        permissionIds: [1, 2, 3, 4],
      };
      request(app)
        .post("/api/roles")
        .set("Authorization", `Bearer ${access_token}`)
        .send(payload)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property("id");
          expect(res.body).to.have.property("code", payload.code);
          expect(res.body).to.have.property("name", payload.name);
          expect(res.body).to.have.property("permissions");
          done();
        });
    });

    it('Should be able to create "EDITOR" role', (done) => {
      const payload = {
        code: "EDITOR",
        name: "Editor",
        permissionIds: [1, 2, 4],
      };
      request(app)
        .post("/api/roles")
        .set("Authorization", `Bearer ${access_token}`)
        .send(payload)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property("id");
          expect(res.body).to.have.property("code", payload.code);
          expect(res.body).to.have.property("name", payload.name);
          expect(res.body).to.have.property("permissions");
          done();
        });
    });
  });

  // ------------------------------------------------------------------------------------------------------------------------------------

  describe("Get Roles", () => {
    it("Should respond with error if authorization header is not set", (done) => {
      request(app)
        .get("/api/roles")
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });

    it("Should get all available roles", (done) => {
      request(app)
        .get("/api/roles")
        .set("Authorization", `Bearer ${access_token}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.length).to.be.greaterThan(0);
          expect(res.body[0]).to.have.property("id");
          expect(res.body[0]).to.have.property("code");
          expect(res.body[0]).to.have.property("name");
          expect(res.body[0]).to.have.property("permissions");
          done();
        });
    });
  });

  // ------------------------------------------------------------------------------------------------------------------------------------

  describe("Add Role to User", () => {
    it("Should respond with error if authorization header is not set", (done) => {
      const userId = 1;
      const payload = {
        roleIds: [1, 2],
      };
      request(app)
        .post(`/api/users/${userId}/roles`)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });

    it("Should respond with error if required request body parameters are missing", (done) => {
      const userId = 1;
      const payload = {};
      request(app)
        .post(`/api/users/${userId}/roles`)
        .set("Authorization", `Bearer ${access_token}`)
        .send(payload)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property("errors");
          done();
        });
    });

    it("Should respond with error if user does not exist", (done) => {
      const userId = 10000;
      request(app)
        .get(`/api/users/${userId}/roles`)
        .set("Authorization", `Bearer ${access_token}`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property(
            "error",
            `User with ID "${userId}" not found.`
          );
          done();
        });
    });

    it("Should be able to assign a list of roles to the user", (done) => {
      const userId = 1;
      const payload = { roleIds: [1, 2] };
      request(app)
        .post(`/api/users/${userId}/roles`)
        .set("Authorization", `Bearer ${access_token}`)
        .send(payload)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property("roles");
          expect(res.body.roles.length).to.equal(2);
          done();
        });
    });

    it("Should respond with error if role is already assinged", (done) => {
      const userId = 1;
      const payload = { roleIds: [1] };
      request(app)
        .post(`/api/users/${userId}/roles`)
        .set("Authorization", `Bearer ${access_token}`)
        .send(payload)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body).to.have.property(
            "error",
            `User has already been assigned the role ID "1"`
          );
          done();
        });
    });
  });

  // ------------------------------------------------------------------------------------------------------------------------------------

  describe("Get Roles Assigned to User", () => {
    it("Should respond with error if authorization header is not set", (done) => {
      const userId = 1;
      request(app)
        .get(`/api/users/${userId}/roles`)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });

    it("Should get list of roles assigned to the user", (done) => {
      const userId = 1;
      request(app)
        .get(`/api/users/${userId}/roles`)
        .set("Authorization", `Bearer ${access_token}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property("roles");
          expect(res.body.roles.length).to.equal(2);
          expect(res.body.roles[0]).to.have.property("id");
          expect(res.body.roles[0]).to.have.property("code");
          expect(res.body.roles[0]).to.have.property("name");
          done();
        });
    });

    it("Should respond with error if user does not exist", (done) => {
      const userId = 10000;
      request(app)
        .get(`/api/users/${userId}/roles`)
        .set("Authorization", `Bearer ${access_token}`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property(
            "error",
            `User with ID "${userId}" not found.`
          );
          done();
        });
    });
  });

  // ------------------------------------------------------------------------------------------------------------------------------------

  describe("Check User Permissions", () => {
    it("Should respond with error if authorization header is not set", (done) => {
      const userId = 1;
      const payload = {
        permissionIds: [1, 2, 3, 4],
      };
      request(app)
        .post(`/api/users/${userId}/permissions`)
        .send(payload)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });

    it("Should respond with error if required request body parameters are missing", (done) => {
      const userId = 1;
      const payload = {};
      request(app)
        .post(`/api/users/${userId}/permissions`)
        .set("Authorization", `Bearer ${access_token}`)
        .send(payload)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property("errors");
          done();
        });
    });

    it("Should respond with which permissions are allowed for user and which are not", (done) => {
      const userId = 1;
      const payload = { permissionIds: [1, 2, 3, 4] };
      request(app)
        .post(`/api/users/${userId}/permissions`)
        .set("Authorization", `Bearer ${access_token}`)
        .send(payload)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body[0]).to.have.property("isAllowed", "Yes");
          done();
        });
    });
  });

  // ------------------------------------------------------------------------------------------------------------------------------------

  server.close();
});
