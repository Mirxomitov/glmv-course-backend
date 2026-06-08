const express = require("express");

const {
  registerController,
  loginController,
  refreshController,
  logoutController,
} = require("./auth.controller");

const { authGuard } = require("../shared/middlewares/middleware");

const router = express.Router();

router.post("/auth/register", registerController);
router.post("/auth/login", loginController);
router.post("/auth/refresh", refreshController);
router.post("/auth/logout", authGuard, logoutController);

module.exports = router;
