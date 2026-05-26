function permissionGuard(...required) {
  return function (req, res, next) {
    if (!req.user) return res.status(401).json({ message: "Unauthenticated" });

    const have = new Set(req.user.permissions || []);
    const ok = required.every((p) => have.has(p));
    
    if (!ok) return res.status(403).json({ message: "Forbidden" });
    return next();
  };
}

module.exports = { permissionGuard };