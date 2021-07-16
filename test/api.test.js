const { app, server } = require("../app.js");
const chai = require("chai");
const request = require("supertest");
const expect = chai.expect;

describe("API Tests", () => {
  describe("Login", (req, res) => {
    it("Should be able to login with correct credentials", (done) => {
      request(app)
        .post("/api/login")
        .send({ username: "demo1", password: "password" })
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property("access_token");
          done();
        });
    });
    it("Should not be able to login with incorrect credentials", (done) => {
      request(app)
        .post("/api/login")
        .send({ username: "demo1", password: "wrongpassword" })
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
      request(app)
        .post("/api/login")
        .send({})
        .expect(401)
        .end((err, res) => {
          expect(res.body).to.have.property("errors");
          done();
        });
    });
  });

  server.close();
});
