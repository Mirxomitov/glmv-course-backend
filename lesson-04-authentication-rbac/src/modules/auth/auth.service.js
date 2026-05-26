const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  findUserByEmail,
  findUserById,
  createUser,
  incrementTokenVersion,
} = require("../users/users.repository");

const { findRoleByName, findRoleById } = require("../roles/roles.repository");
const { findPermissionsByIds } = require("../permissions/permissions.repository");

// should be in .env, add later, for now ok
const SALT_ROUNDS = 10;

function signAccessToken(user, role, permissions) {
  return jwt.sign(
    {
      sub: user.id,
      role: role.name,
      permissions: permissions.map((p) => p.code),
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_TTL || "15m" }
  );
}

function signRefreshToken(user) {
  return jwt.sign(
    { sub: user.id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_TTL || "7d" }
  );
}

async function issueTokens(user) {
  const role = await findRoleById(user.roleId);
  const permissions = role? await findPermissionsByIds(role.permissionIds) : [];
  
  return {
    accessToken: signAccessToken(user, role, permissions),
    refreshToken: signRefreshToken(user),
  };
}

async function registerService({ email, password }) {
  if (!email || !password) throw new Error("Email and password are required");
  if (password.length < 6) throw new Error("Password too short");

  const existing = await findUserByEmail(email);
  if (existing) throw new Error("Email already registered");

  const role = await findRoleByName("user");
  if (!role) throw new Error("Invalid role");

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await createUser({ email, passwordHash, roleId: role.id });

  return await issueTokens(user);
}

async function loginService({ email, password }) {
  if (!email || !password) throw new Error("Email and password are required");

  const user = await findUserByEmail(email);
  if (!user) throw new Error("Invalid credentials");

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) throw new Error("Invalid credentials");

  return await issueTokens(user);
}

async function refreshService(refreshToken) {
  if (!refreshToken) throw new Error("Refresh token required");

  let payload;
  try {
    payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch {
    throw new Error("Invalid refresh token");
  }

  const user = await findUserById(payload.sub);
  if (!user || user.tokenVersion !== payload.tokenVersion) {
    throw new Error("Invalid refresh token");
  }

  return await issueTokens(user);
}

async function logoutService(userId) {
  await incrementTokenVersion(userId);
}

module.exports = {
  registerService,
  loginService,
  refreshService,
  logoutService,
};
