const Role = require("./role.model");

async function getAllRoles() {
  return Role.find();
}

async function findRoleById(id) {
  return Role.findById(id);
}

async function findRoleByName(name) {
  return Role.findOne({ name });
}

module.exports = {
  getAllRoles,
  findRoleById,
  findRoleByName,
};
