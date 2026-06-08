const { permissions } = require("../shared/db/db");

async function getAllPermissions() {
  return permissions;
}

async function findPermissionsByIds(ids) {
  return permissions.filter((p) => ids.includes(p.id));
}

module.exports = {
  getAllPermissions,
  findPermissionsByIds,
};
