const { roles } = require("../shared/db/db");

async function getAllRoles() {
  return roles;
}

async function findRoleById(id) {
  return roles.find((r) => r.id === id) || null;
}

async function findRoleByName(name) {
  return roles.find((r) => r.name === name) || null;
}

module.exports = {
  getAllRoles,
  findRoleById,
  findRoleByName,
};
