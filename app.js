const express = require("express");
const passport = require("passport");
const { User } = require("./models");
const { configurePassport } = require("./middlewares");
const authRoutes = require("./routes/auth");
const protectedRoutes = require("./routes/protected");
const cors = require("cors");

configurePassport(passport, User);
const app = express();
const port = process.env.PORT || 3000;
const jwtOpt = { session: false };

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", authRoutes);
app.use(passport.authenticate("jwt", jwtOpt));
app.use("/api", protectedRoutes);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
