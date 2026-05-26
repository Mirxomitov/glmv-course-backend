const { HttpError } = require("../../shared/errors/http-error");

function roleGuard(...allowedRoles) {
  return function (req, res, next) {
    if (!req.user) return next(HttpError.unauthorized("Unauthenticated"));

    if (!allowedRoles.includes(req.user.role)) {
      return next(HttpError.forbidden("Forbidden"));
    }
    return next();
  };
}

module.exports = { roleGuard };
