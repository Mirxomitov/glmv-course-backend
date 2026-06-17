const { createUserService, getUsersService } = require("./users.service");

async function createUserController(req, res, next) {
  try {
    const { fullName, balance } = req.body;

    const user = await createUserService({ fullName, balance });
    return res.status(201).json({ message: "ok", data: user });
  } catch (error) {
    return next(error);
  }
}

async function getUsersController(req, res, next) {
  try {
    const users = await getUsersService();
    return res.status(200).json({ message: "ok", data: users });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createUserController,
  getUsersController,
};
