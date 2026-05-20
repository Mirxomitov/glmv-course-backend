const { product } = require("../shared/db/db");

async function getProductRepository() {
  return product;
}

async function addStock(amount) {
  product.stock += amount;
}

async function removeStock(amount) {
  product.stock -= amount;
}

module.exports = {
  getProductRepository,
  addStock,
  removeStock,
};
