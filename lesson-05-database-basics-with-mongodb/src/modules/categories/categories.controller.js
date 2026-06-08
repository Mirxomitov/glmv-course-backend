const { listCategoriesService } = require("./categories.service");

async function listCategoriesController(req, res, next) {
  try {
    const categories = await listCategoriesService();
    return res.status(200).json({ message: "ok", data: categories });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  listCategoriesController,
};
