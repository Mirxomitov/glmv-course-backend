const { getAllRoles, findRoleById } = require("./roles.repository");

async function listRolesService() {
  return await getAllRoles();
}

async function getRoleService(id) {
  const role = await findRoleById(Number(id));
  if (!role) throw new Error("Role not found");
  return role;
}

module.exports = {
  listRolesService,
  getRoleService,
};
