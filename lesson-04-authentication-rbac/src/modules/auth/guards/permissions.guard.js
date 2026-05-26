const { HttpError } = require("../../shared/errors/http-error");

function permissionGuard(...required) {
  return function (req, res, next) {
    if (!req.user) return next(HttpError.unauthorized("Unauthenticated"));

    const have = new Set(req.user.permissions || []);
    const ok = required.every((p) => have.has(p));

    if (!ok) return next(HttpError.forbidden("Forbidden"));
    return next();
  };
}

module.exports = { permissionGuard };
