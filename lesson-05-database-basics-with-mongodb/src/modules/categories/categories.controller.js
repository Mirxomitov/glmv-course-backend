const { listCategoriesService } = require("./categories.service");

async function listCategoriesController(req, res) {
  const categories = await listCategoriesService();
  return res.status(200).json({ message: "ok", data: categories });
}

module.exports = {
  listCategoriesController,
};
