const permissions = [
  { id: 1, code: "users.read" },
  { id: 2, code: "users.write" },
  { id: 3, code: "roles.manage" },
  { id: 4, code: "roles.read" },
  { id: 5, code: "permissions.read" },
];

const roles = [
  { id: 1, name: "admin", permissionIds: [1, 2, 3, 4, 5] },
  { id: 2, name: "user", permissionIds: [1] },
];

const users = [];

let nextUserId = 1; // what is this?

module.exports = {
  permissions,
  roles,
  users,
  getNextUserId: () => nextUserId++,
};
