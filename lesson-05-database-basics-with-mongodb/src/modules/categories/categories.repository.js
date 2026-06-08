const Category = require("./category.model");

async function getAllCategories() {
  return Category.find();
}

async function findCategoriesByIds(ids) {
  return Category.find({ _id: { $in: ids } });
}

module.exports = {
  getAllCategories,
  findCategoriesByIds,
};
