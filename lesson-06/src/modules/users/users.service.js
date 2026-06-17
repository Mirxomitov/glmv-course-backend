const User = require("./users.model");
const { HttpError } = require("../shared/errors/http-error");

async function createUserService({ fullName, balance }) {
  if (!fullName) throw HttpError.badRequest("fullName is required");

  return User.create({ fullName, balance });
}

async function getUsersService() {
  return User.find();
}

module.exports = {
  createUserService,
  getUsersService,
};
