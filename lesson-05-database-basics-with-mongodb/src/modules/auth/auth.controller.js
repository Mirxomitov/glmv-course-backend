const {
  registerService,
  loginService,
  refreshService,
  logoutService,
} = require("./auth.service");

async function registerController(req, res, next) {
  try {
    const tokens = await registerService(req.body);
    return res.status(201).json({ message: "Registered", data: tokens });
  } catch (error) {
    return next(error);
  }
}

async function loginController(req, res, next) {
  try {
    const tokens = await loginService(req.body);
    return res.status(200).json({ message: "Logged in", data: tokens });
  } catch (error) {
    return next(error);
  }
}

async function refreshController(req, res, next) {
  try {
    const tokens = await refreshService(req.body.refreshToken);
    return res.status(200).json({ message: "Refreshed", data: tokens });
  } catch (error) {
    return next(error);
  }
}

async function logoutController(req, res, next) {
  try {
    await logoutService(req.user.sub);
    return res.status(200).json({ message: "Logged out" });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  registerController,
  loginController,
  refreshController,
  logoutController,
};
