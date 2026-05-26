const { users, getNextUserId } = require("../shared/db/db");

async function findUserByEmail(email) {
  return users.find((u) => u.email === email) || null;
}

async function findUserById(id) {
  return users.find((u) => u.id === id) || null;
}

async function createUser({ email, passwordHash, roleId }) {
  const user = {
    id: getNextUserId(),
    email,
    passwordHash,
    roleId,
    tokenVersion: 0, // why we need token version?
  };
  users.push(user);
  return user;
}

async function incrementTokenVersion(userId) {
  const user = users.find((u) => u.id === userId);
  if (user) user.tokenVersion += 1;
  return user;
}

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
  incrementTokenVersion,
};
