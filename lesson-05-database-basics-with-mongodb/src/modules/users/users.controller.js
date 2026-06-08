const { getCurrentUserService, getUserPostsService } = require("./users.service");
const { parseObjectId } = require("../shared/db/object-id");

async function getMeController(req, res, next) {
  try {
    const user = await getCurrentUserService(req.user.sub); // sub is user id from jwt {sub: "user_id", role: "admin", ...}
    return res.status(200).json({ message: "ok", data: user });
  } catch (error) {
    return next(error);
  }
}

async function getUserPostsController(req, res, next) {
  try {
    const userId = parseObjectId(req.params.userId, "user id");

    const posts = await getUserPostsService(userId);
    return res.status(200).json({ message: "ok", data: posts });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getMeController,
  getUserPostsController
};
