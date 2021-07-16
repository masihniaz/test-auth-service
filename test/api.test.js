const { app, server } = require("../app.js");
const chai = require("chai");
const request = require("supertest");
const expect = chai.expect;

describe("API Tests", () => {
  xdescribe("Signup", (req, res) => {
    it("Should be able to sign up with correct information", (done) => {
      const payload = {
        username: "masih",
        email: "masihniazz@gmail.com",
        password: "password",
      };
      request(app)
        .post("/api/signup")
        .send(payload)
        .expect(201)
        .end((err, res) => {
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
        .expect(401)
        .end((err, res) => {
          expect(res.body).to.have.property("errors");
          done();
        });
    });

    it("Should respond with error if username or email exist", (done) => {
      const payload = {
        username: "masih",
        email: "masihniazz@gmail.com",
        password: "password",
      };
      request(app)
        .post("/api/signup")
        .send(payload)
        .expect(401)
        .end((err, res) => {
          expect(res.body).to.have.property(
            "error",
            `User with email address: "${payload.email}" or username: "${payload.username}" already exists`
          );
          done();
        });
    });
  });

  xdescribe("Login", (req, res) => {
    it("Should be able to login with correct credentials", (done) => {
      const payload = { username: "demo1", password: "password" };
      request(app)
        .post("/api/login")
        .send(payload)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property("access_token");
          done();
        });
    });
    it("Should not be able to login with incorrect credentials", (done) => {
      const payload = { username: "demo1", password: "wrongpassword" };
      request(app)
        .post("/api/login")
        .send(payload)
        .expect(401)
        .end((err, res) => {
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
        .expect(401)
        .end((err, res) => {
          expect(res.body).to.have.property("errors");
          done();
        });
    });
  });

  server.close();
});
