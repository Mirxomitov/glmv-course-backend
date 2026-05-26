const express = require("express");

const { productRouter } = require("./modules/users/product.module");
  const {
    jsonParser,
    logger,
  } = require("./modules/shared/middlewares/middleware");

const app = express();

app.use(jsonParser);
app.use(logger);
app.use(productRouter);

module.exports = app;
