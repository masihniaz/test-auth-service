const express = require("express");
// const passport = require("passport");
const cors = require("cors");
const routes = require("./routes");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});