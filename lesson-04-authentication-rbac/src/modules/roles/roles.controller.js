const { listRolesService, getRoleService } = require("./roles.service");

async function listRolesController(req, res) {
  const roles = await listRolesService();
  return res.status(200).json({ message: "ok", data: roles });
}

async function getRoleController(req, res) {
  try {
    const role = await getRoleService(req.params.id);
    return res.status(200).json({ message: "ok", data: role });
  } catch (error) {
    return res.status(404).json({ message: error?.message || "Error" });
  }
}

module.exports = {
  listRolesController,
  getRoleController,
};
