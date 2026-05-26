const {
  getProductRepository,
  addStock: addStockRepository,
  removeStock: removeStockRepository,
} = require("./permissions.repository");

let buyInProgress = false;

async function getProductService(req) {
  return await getProductRepository();
}

async function buyProductService(req) {
  const quantity = Number(req.body.quantity);

  if (!quantity || quantity <= 0) {
     throw new Error("Quantity must be greater than 0");
  }

  if (buyInProgress) {
     throw new Error("Too many requests");    
  }

  const product = await getProductRepository();

  if (product.stock < quantity) {   
    throw new Error("Not enough stock");    
  }

     buyInProgress = true;

  console.log("before: stock = ", product.stock);

  setTimeout(() => {
    removeStockRepository(quantity);

    console.log("after: stock = ", product.stock);

    buyInProgress = false;
  }, 1000);
}

async function restockProductService(req) {
  const amount = Number(req.body.amount);

  if (!amount || amount <= 0) {
    throw new Error("Invalid restock amount");
  }

  const product = await getProductRepository();

  console.log("before: restock = ", product.stock);

  await addStockRepository(amount);

  console.log("after: restock = ", product.stock);

  return product.stock;
}

module.exports = {
  getProductService,
  buyProductService,
  restockProductService,
};
