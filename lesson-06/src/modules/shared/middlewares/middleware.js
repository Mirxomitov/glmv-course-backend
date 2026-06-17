const express = require("express");

// Parses incoming JSON request bodies into req.body
const jsonParser = express.json();

// Simple request logger so students can see what hits the server
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
