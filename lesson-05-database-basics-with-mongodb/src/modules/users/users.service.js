const { findUserById } = require("./users.repository");
const { findRoleById } = require("../roles/roles.repository");
const { findPermissionsByIds } = require("../permissions/permissions.repository");
const { HttpError } = require("../shared/errors/http-error");

async function getCurrentUserService(userId) {
  const user = await findUserById(userId);
  if (!user) throw HttpError.notFound("User not found");

  const role = await findRoleById(user.roleId);
  const permissions = role ? await findPermissionsByIds(role.permissionIds): [];

  return {
    id: user.id,
    email: user.email,
    username: user.username,
    role: role ? role.name : null,
    permissions: permissions.map((p) => p.code),
  };
}

module.exports = {
  getCurrentUserService,
};
