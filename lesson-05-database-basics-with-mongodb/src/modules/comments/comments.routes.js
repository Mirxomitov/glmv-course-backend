const express = require("express");

const {
  listCommentsController,
  addCommentController,
} = require("./comments.controller");

const {
  authGuard,
  permissionGuard,
} = require("../shared/middlewares/middleware");

const router = express.Router();

router.get(
  "/posts/:postId/comments",
  authGuard,
  permissionGuard("comments.read"),
  listCommentsController
);

router.post(
  "/posts/:postId/comments",
  authGuard,
  permissionGuard("comments.write"),
  addCommentController
);

module.exports = router;
