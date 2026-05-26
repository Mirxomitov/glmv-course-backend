const permissions = [
  { id: 1, code: "users.read" },
  { id: 2, code: "users.write" },
  { id: 3, code: "roles.manage" },
];

const roles = [
  { id: 1, name: "admin", permissionIds: [1, 2, 3] },
  { id: 2, name: "user", permissionIds: [1] },
];

const users = [];

let nextUserId = 1;

module.exports = {
  permissions,
  roles,
  users,
  getNextUserId: () => nextUserId++,
};
