const { getCurrentUserService } = require("./users.service");

async function getMeController(req, res) {
  try {
    const user = await getCurrentUserService(req.user.sub); // sub is user id from jwt {sub: "user_id", role: "admin", ...}
    return res.status(200).json({ message: "ok", data: user });
  } catch (error) {
    return res.status(404).json({ message: error?.message || "Error" });
  }
}

module.exports = {
  getMeController,
};
