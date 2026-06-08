const Permission = require("./permission.model");

async function getAllPermissions() {
  return Permission.find();
}

async function findPermissionsByIds(ids) {
  return Permission.find({ _id: { $in: ids } });
}

module.exports = {
  getAllPermissions,
  findPermissionsByIds,
};
