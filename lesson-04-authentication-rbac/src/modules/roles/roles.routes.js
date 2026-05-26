const express = require("express");

const { 
    getProductsController, 
    buyProductController,
    restockProductController
} = require("./product.controller");

const router = express.Router();

router.get("/product", getProductsController);
router.post("/buy", buyProductController);
router.post("/restock", restockProductController);

module.exports = router;
