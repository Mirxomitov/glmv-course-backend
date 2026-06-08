const express = require("express");
const { authGuard } = require("../../auth/guards/jwt-auth.guard");
const { roleGuard } = require("../../auth/guards/roles.guard");
const { permissionGuard } = require("../../auth/guards/permissions.guard");

const jsonParser = express.json();

const SENSITIVE_FIELDS = ["password", "passwordHash", "refreshToken", "accessToken"];

function redactBody(body) {
  if (!body || typeof body !== "object") return body;
  const clone = { ...body };
  for (const field of SENSITIVE_FIELDS) {
    if (field in clone) clone[field] = "[REDACTED]";
  }
  return clone;
}

function logger(req, res, next) {
  console.log("Method:", req.method);
  console.log("URL:", req.url);
  console.log("Body:", redactBody(req.body));
  next();
}

module.exports = {
  jsonParser,
  logger,
  authGuard,
  roleGuard,
  permissionGuard,
};
