const { app, server } = require("../app.js");
const chai = require("chai");
const request = require("supertest");
const expect = chai.expect;

describe("API Tests", () => {
  let access_token;
  describe("Signup", (req, res) => {
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

    it("Should respond with error if body parameters are missing", (done) => {
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

  describe("Login", (req, res) => {
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
    it("Should respond with error if body parameters are missing", (done) => {
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

  server.close();
});
