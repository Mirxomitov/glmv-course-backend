const {
  registerService,
  loginService,
  refreshService,
  logoutService,
} = require("./auth.service");

// LATER use shared/error, for now ok.
function mapErrorToStatus(error) {
  const m = error?.message || "Error";
  if (m === "Email already registered") return 409;
  if (m === "Invalid credentials") return 401;
  if (m === "Invalid refresh token" || m === "Refresh token required") return 401;
  if (
    m === "Email and password are required" ||
    m === "Password too short" ||
    m === "Invalid role"
  )
    return 400;
  return 500;
}

async function registerController(req, res) {
  try {
    const tokens = await registerService(req.body);
    return res.status(201).json({ message: "Registered", data: tokens });
  } catch (error) {
    return res
      .status(mapErrorToStatus(error))
      .json({ message: error?.message || "Error" });
  }
}

async function loginController(req, res) {
  try {
    const tokens = await loginService(req.body);
    return res.status(200).json({ message: "Logged in", data: tokens });
  } catch (error) {
    return res
      .status(mapErrorToStatus(error))
      .json({ message: error?.message || "Error" });
  }
}

async function refreshController(req, res) {
  try {
    const tokens = await refreshService(req.body.refreshToken);
    return res.status(200).json({ message: "Refreshed", data: tokens });
  } catch (error) {
    return res
      .status(mapErrorToStatus(error))
      .json({ message: error?.message || "Error" });
  }
}

async function logoutController(req, res) {
  await logoutService(req.user.sub);
  return res.status(200).json({ message: "Logged out" });
}

module.exports = {
  registerController,
  loginController,
  refreshController,
  logoutController,
};
