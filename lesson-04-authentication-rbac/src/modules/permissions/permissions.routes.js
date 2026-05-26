const express = require("express");

const { listPermissionsController } = require("./permissions.controller");

const {
  authGuard,
  permissionGuard,
} = require("../shared/middlewares/middleware");

const router = express.Router();

router.get(
  "/permissions",
  authGuard,
  permissionGuard("permissions.read"),
  listPermissionsController
);

module.exports = router;
