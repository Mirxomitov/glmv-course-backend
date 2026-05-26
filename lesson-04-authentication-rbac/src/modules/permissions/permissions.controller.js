const { listPermissionsService } = require("./permissions.service");

async function listPermissionsController(req, res) {
  const permissions = await listPermissionsService();
  return res.status(200).json({ message: "ok", data: permissions });
}

module.exports = {
  listPermissionsController,
};
