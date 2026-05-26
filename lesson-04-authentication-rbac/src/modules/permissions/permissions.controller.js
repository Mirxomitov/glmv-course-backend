const {
  getProductService: getProductsService,
  buyProductService,
  restockProductService,
} = require("./permissions.service");

function mapErrorToStatus(error) {
  const message = error?.message || "Error";
  if (message === "Quantity must be greater than 0") return 400;
  if (message === "Invalid restock amount") return 400;
  if (message === "Not enough stock") return 400;
  if (message === "Too many requests") return 409;
  return 500;
}

async function getProductsController(req, res) {
  try {
    const products = await getProductsService(req.body);

    return res.status(200).json({
      message: "Successfully got products",
      data: products,
    });
  } catch (error) {
    return res.status(mapErrorToStatus(error)).json({
      message: error?.message || "Error",
      data: [],
    });
  }
}

async function buyProductController(req, res) {
  try {
    await buyProductService(req);

    return res.status(200).json({
      message: "Successfully bought",
    });
  } catch (error) {
    return res.status(mapErrorToStatus(error)).json({
      message: error?.message || "Error",
    });
  }
}

async function restockProductController(req, res) {
  try {
    const remainingStock = await restockProductService(req);

    return res.status(200).json({
      success: true,
      message: "Successfully restocked",
      remainingStock: remainingStock,
    });
  } catch (error) {
    return res.status(mapErrorToStatus(error)).json({
      message: error?.message || "Error",
    });
  }
}

module.exports = {
  getProductsController,
  buyProductController,
  restockProductController,
};
