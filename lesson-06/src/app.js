require("dotenv").config();

const express = require("express");

const { usersRouter } = require("./modules/users/users.module");
const { coursesRouter } = require("./modules/courses/courses.module");

const {
  jsonParser,
  logger,
} = require("./modules/shared/middlewares/middleware");
const { errorHandler } = require("./modules/shared/errors/http-error");

const app = express();

app.use(jsonParser);
app.use(logger);

app.use(usersRouter);
app.use(coursesRouter);

app.use(errorHandler);

module.exports = app;
