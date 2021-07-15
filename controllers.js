const { User, Permission, Role, RolePermission } = require("./models");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    let user = await User.findOne({
      where: { [Op.or]: [{ email }, { username }] },
    });

    if (user) {
      return res.status(409).json({
        error: `User with email address: "${email}" or username: "${username}" already exists`,
      });
    }

    user = await User.create({ email, username, password });
    await user.save();
    const { id } = user;
    return res.status(201).json({ id, username, email });
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

  const { id, email } = user;
  const payload = {
    sub: id,
    username,
    email,
  };

  // load jwt secret from env later on
  const access_token = jwt.sign(payload, "mysecret", {
    expiresIn: "24h",
  });
  return res.status(200).json({ access_token });
};

exports.createPermission = async (req, res) => {
  const { name, code } = req.body;
  let permission = await Permission.findOne({
    where: { [Op.or]: [{ name }, { code }] },
  });

  if (permission) {
    return res.status(409).json({
      error: `Permission with name: "${name}" or code: "${code}" already exists`,
    });
  }

  permission = await Permission.create({ name, code });
  await permission.save();
  const { id: pId, code: pCode, name: pName } = permission;
  return res.status(201).json({ id: pId, code: pCode, name: pName });
};

exports.getPermissions = async (req, res) => {
  const permissions = await Permission.findAll({
    attributes: ["id", "code", "name"],
  });

  return res.status(200).json(permissions);
};

exports.createRole = async (req, res) => {
  const { code, name, permissionIds } = req.body;

  let role = await Role.findOne({
    where: { [Op.or]: [{ name }, { code }] },
  });

  if (role) {
    return res.status(409).json({
      error: `Role with code: "${code} or name: "${name}" already exist.`,
    });
  }

  role = await Role.create({ name, code });
  await role.save();

  for (let i = 0; i < permissionIds.length; i++) {
    await RolePermission.create({
      roleId: role.id,
      permissionId: permissionIds[i],
    });
  }

  const createdRole = await Role.findOne({
    where: { id: role.id },
    attributes: ["id", "name", "code"],
    include: [
      {
        model: Permission,
        as: "permissions",
        attributes: ["id", "code", "name"],
        through: {
          attributes: [],
        },
      },
    ],
  });

  return res.status(201).json(createdRole);
};

exports.getRoles = async (req, res) => {
  const roles = await Role.findAll({
    include: [
      {
        model: Permission,
        as: "permissions",
        attributes: ["id", "name", "code"],
        through: {
          attributes: [],
        },
      },
    ],
    attributes: ["id", "code", "name"],
  });

  return res.status(200).json(roles);
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
