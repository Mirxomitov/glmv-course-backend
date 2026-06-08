const express = require("express");

const { getMeController, getUserPostsController } = require("./users.controller");
const { authGuard } = require("../shared/middlewares/middleware");

const router = express.Router();

router.get("/users/me", authGuard, getMeController);

router.get("/users/:userId/posts", authGuard, getUserPostsController)

module.exports = router;
