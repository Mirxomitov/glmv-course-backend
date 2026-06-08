const express = require("express");

const { getMeController } = require("./users.controller");
const { authGuard } = require("../shared/middlewares/middleware");

const router = express.Router();

router.get("/users/me", authGuard, getMeController);

module.exports = router;
