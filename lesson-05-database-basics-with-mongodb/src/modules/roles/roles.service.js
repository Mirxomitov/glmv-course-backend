const { getAllRoles, findRoleById } = require("./roles.repository");
const { HttpError } = require("../shared/errors/http-error");

async function listRolesService() {
  return await getAllRoles();
}

async function getRoleService(id) {
  const role = await findRoleById(Number(id));
  if (!role) throw HttpError.notFound("Role not found");
  return role;
}

module.exports = {
  listRolesService,
  getRoleService,
};
