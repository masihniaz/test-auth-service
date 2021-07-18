const {
  User,
  Permission,
  Role,
  RolePermission,
  UserRole,
} = require("../db/models");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];

exports.signup = async (req, res) => {
  const { email, username, password } = req.body;
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
    return res.status(401).json({ error: "Incorrect username or password." });
  }

  const { id, email } = user;
  const payload = {
    sub: id,
    username,
    email,
  };

  const access_token = jwt.sign(payload, config.jwtSecret, {
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

exports.addRoleToUser = async (req, res) => {
  const { roleIds } = req.body;
  const { id: userId } = req.params;

  let user = await User.findOne({
    where: { id: userId },
    attributes: [],
    include: [
      {
        model: Role,
        as: "roles",
        attributes: ["id"],
        through: {
          attributes: [],
        },
      },
    ],
  });

  if (!user) {
    return res.status(404).json({
      error: `User with ID "${userId}" not found.`,
    });
  }

  for (let i = 0; i < roleIds.length; i++) {
    for (let j = 0; j < user.roles.length; j++) {
      if (roleIds[i] === user.roles[j].id) {
        return res.status(409).json({
          error: `User has already been assigned the role ID "${roleIds[i]}"`,
        });
      }
    }
  }

  for (let i = 0; i < roleIds.length; i++) {
    await UserRole.create({
      userId,
      roleId: roleIds[i],
    });
  }

  user = await User.findOne({
    where: { id: userId },
    attributes: [],
    include: [
      {
        model: Role,
        as: "roles",
        attributes: ["id", "code", "name"],
        through: {
          attributes: [],
        },
      },
    ],
  });

  return res.status(201).json(user);
};

exports.GetRolesAssignedToUser = async (req, res) => {
  const { id: userId } = req.params;

  const user = await User.findOne({
    where: { id: userId },
    attributes: [],
    include: [
      {
        model: Role,
        as: "roles",
        attributes: ["id", "code", "name"],
        through: {
          attributes: [],
        },
      },
    ],
  });

  if (!user) {
    return res.status(404).json({
      error: `User with ID "${userId}" not found.`,
    });
  }

  return res.status(200).json(user);
};

exports.checkUserPermissions = async (req, res) => {
  const { permissionIds } = req.body;
  const { id: userId } = req.params;

  const user = await User.findOne({
    where: { id: userId },
    attributes: [],
    include: [
      {
        model: Role,
        as: "roles",
        attributes: ["id"],
        through: {
          attributes: [],
        },
        include: {
          model: Permission,
          as: "permissions",
          attributes: ["id", "code", "name"],
          through: {
            attributes: [],
          },
        },
      },
    ],
  });

  const allowedUserPermissions = {};

  user.roles.forEach((role) => {
    role.permissions.forEach((permission) => {
      const { id, code, name } = permission;
      if (!allowedUserPermissions[permission.id]) {
        allowedUserPermissions[permission.id] = {
          id,
          code,
          name,
          isAllowed: "Yes",
        };
      }
    });
  });

  const notAllowedUserPermissionIds = [];

  permissionIds.forEach((permissionId) => {
    if (!allowedUserPermissions[permissionId]) {
      notAllowedUserPermissionIds.push(permissionId);
    }
  });

  const notAlloweduserPermissions = (
    await Permission.findAll({
      where: { id: notAllowedUserPermissionIds },
      attributes: ["id", "code", "name"],
    })
  ).map((permission) => {
    const { id, code, name } = permission;
    return { id, code, name, isAllowed: "No" };
  });

  return res
    .status(200)
    .json([
      ...Object.values(allowedUserPermissions),
      ...Object.values(notAlloweduserPermissions),
    ]);
};
