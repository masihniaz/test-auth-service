const { User } = require("./models");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { email, username } = req.body;
  try {
    let user = await User.findOne({
      where: { [Op.or]: [{ email }, { username }] },
    });

    if (user) {
      return res.status(409).json({
        error: `user with email address: ${req.body.email} or username: ${username} already exists`,
      });
    }

    user = await User.create(req.body);
    await user.save();
    const { id, createdAt, updatedAt } = user;
    return res.status(201).json({ id, username, email, createdAt, updatedAt });
  } catch (e) {
    console.log(e); // setup logger
    return res.status(500);
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    where: {
      [Op.or]: [{ email: username }, { username }],
    },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(400).json({ error: "Incorrect username or password." });
  }

  const { id, email, createdAt, updatedAt } = user;
  const payload = {
    sub: id,
    username,
    email,
    createdAt,
    updatedAt,
  };

  // load jwt secret from env later on
  const access_token = jwt.sign(payload, "mysecret", {
    expiresIn: "24h",
  });
  return res.status(200).json({ access_token });
};

exports.createPermission = (req, res) => {
  res.send("create permission route");
};

exports.getPermissions = (req, res) => {
  res.send("get permissions route");
};

exports.createRole = (req, res) => {
  res.send("create role route");
};

exports.getRoles = (req, res) => {
  res.send("get roles route");
};

exports.addRoleToUser = (req, res) => {
  res.send("add role to user route");
};

exports.getUserRoles = (req, res) => {
  res.send("get user roles route");
};

exports.checkUserPermissions = (req, res) => {
  res.send("check user permission route");
};
