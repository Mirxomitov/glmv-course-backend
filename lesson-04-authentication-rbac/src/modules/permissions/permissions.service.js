const { getAllPermissions } = require("./permissions.repository");

async function listPermissionsService() {
  return await getAllPermissions();
}

module.exports = {
  listPermissionsService,
};
