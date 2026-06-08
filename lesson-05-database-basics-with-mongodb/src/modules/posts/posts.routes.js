const express = require("express");

const {
  listPostsController,
  publishPostController,
  toggleLikeController,
  editPostController,
} = require("./posts.controller");

const {
  authGuard,
  permissionGuard,
} = require("../shared/middlewares/middleware");

const router = express.Router();

router.get(
  "/posts",
  authGuard,
  permissionGuard("posts.read"),
  listPostsController
);

router.post(
  "/publish",
  authGuard,
  permissionGuard("posts.write"),
  publishPostController
);

router.patch(
  "/posts/:postId",
  authGuard,
  permissionGuard("posts.write"),
  editPostController
);

router.post(
  "/posts/:postId/like",
  authGuard,
  permissionGuard("posts.read"),
  toggleLikeController
);

module.exports = router;
