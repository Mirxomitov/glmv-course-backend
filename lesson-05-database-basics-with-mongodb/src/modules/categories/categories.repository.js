const { categories } = require("../shared/db/db");

async function getAllCategories() {
  return categories;
}

async function findCategoriesByIds(ids) {
  return categories.filter((c) => ids.includes(c.id));
}

module.exports = {
  getAllCategories,
  findCategoriesByIds,
};
