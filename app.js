const express = require("express");
const passport = require("passport");
const { User } = require("./models");
const { configurePassport } = require("./middlewares");
const routes = require("./routes");
const cors = require("cors");

configurePassport(passport, User);
const app = express();
const port = process.env.PORT || 3000;
const jwtOpt = { session: false };

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
