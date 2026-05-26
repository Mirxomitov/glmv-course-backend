const express = require("express");

const jsonParser = express.json();

function logger(req, res, next) {
  console.log("Method:", req.method);
  console.log("URL:", req.url);
  console.log("Body:", req.body);
  next();
}

module.exports = {
  jsonParser,
  logger,
};
