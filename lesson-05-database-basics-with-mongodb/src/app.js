require("dotenv").config();

const express = require("express");

const { authRouter } = require("./modules/auth/auth.module");
const { usersRouter } = require("./modules/users/users.module");
const { rolesRouter } = require("./modules/roles/roles.module");
const { permissionsRouter } = require("./modules/permissions/permissions.module");

const {
  jsonParser,
  logger,
} = require("./modules/shared/middlewares/middleware");
const { errorHandler } = require("./modules/shared/errors/http-error");

const app = express();

app.use(jsonParser);
app.use(logger);

app.use(authRouter);
app.use(usersRouter);
app.use(rolesRouter);
app.use(permissionsRouter);

app.use(errorHandler);

module.exports = app;
