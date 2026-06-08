const express = require("express");

const { listCategoriesController } = require("./categories.controller");

const {
  authGuard,
  permissionGuard,
} = require("../shared/middlewares/middleware");

const router = express.Router();

router.get(
  "/categories",
  authGuard,
  permissionGuard("categories.read"),
  listCategoriesController
);

module.exports = router;
