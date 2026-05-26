const { listRolesService, getRoleService } = require("./roles.service");

async function listRolesController(req, res, next) {
  try {
    const roles = await listRolesService();
    return res.status(200).json({ message: "ok", data: roles });
  } catch (error) {
    return next(error);
  }
}

async function getRoleController(req, res, next) {
  try {
    const role = await getRoleService(req.params.id);
    return res.status(200).json({ message: "ok", data: role });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  listRolesController,
  getRoleController,
};
