require("dotenv").config(); // only for development and testing to read from .env | for production set environment variables on the system
const path = require("path");

module.exports = {
  development: {
    username: "root",
    password: "root",
    storage: path.join(__dirname, "..", "db", "database.sqlite"),
    host: "localhost",
    dialect: "sqlite",
    logging: false,
    jwtSecret: process.env.JWT_SECRET,
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    jwtSecret: process.env.JWT_SECRET,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    jwtSecret: process.env.JWT_SECRET,
  },
};
