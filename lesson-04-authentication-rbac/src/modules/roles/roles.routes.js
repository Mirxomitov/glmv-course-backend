const express = require("express");

const {
  listRolesController,
  getRoleController,
} = require("./roles.controller");

const {
  authGuard,
  permissionGuard,
} = require("../shared/middlewares/middleware");

const router = express.Router();

router.get(
  "/roles",
  authGuard,
  permissionGuard("roles.read"),
  listRolesController
);

router.get(
  "/roles/:id",
  authGuard,
  permissionGuard("roles.read"),
  getRoleController
);

module.exports = router;
