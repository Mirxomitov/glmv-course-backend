const { getAllCategories } = require("./categories.repository");

async function listCategoriesService() {
  return await getAllCategories();
}

module.exports = {
  listCategoriesService,
};
