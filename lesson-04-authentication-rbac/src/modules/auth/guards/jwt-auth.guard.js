const jwt = require("jsonwebtoken");
const { HttpError } = require("../../shared/errors/http-error");

function authGuard(req, res, next) {
  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    return next(HttpError.unauthorized("Missing or invalid Authorization header"));
  }

  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = payload;
    return next();
  } catch {
    return next(HttpError.unauthorized("Invalid or expired access token"));
  }
}

module.exports = { authGuard };
