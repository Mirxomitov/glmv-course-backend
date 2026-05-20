const express = require("express");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log("Method:", req.method);
  console.log("URL:", req.url);
  console.log("Body:", req.body);

  next();
});

let product = {
  name: "Laptop",
  stock: 5,
};

// let buyInProgress = false;

app.get("/product", (req, res) => {
  return res.json(product);
});

app.post("/buy", (req, res) => {
  const quantity = Number(req.body.quantity);

  if (!quantity || quantity <= 0) {
    return res.status(400).json({
      success: false,
      message: "Quantity must be greater than 0",
    });
  }

  // if (buyInProgress) {
  //   return res.status(409).json({
  //     success: false,
  //     message: "Too many requests",
  //   });
  // }

  if (product.stock < quantity) {
    return res.status(400).json({
      success: false,
      message: "Not enough stock",
    });
  }

  // buyInProgress = true;

  console.log("before: stock = ", product.stock);

  setTimeout(() => {
    product.stock = product.stock - quantity;

    console.log("after: stock = ", product.stock);

    // buyInProgress = false;

    return res.status(200).json({
      success: true,
      message: "Successfully bought",
      remainingStock: product.stock,
    });
  }, 1000);
});

app.post("/restock", (req, res) => {
  const amount = Number(req.body.amount);

  if (!amount || amount <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid restock amount",
    });
  }

  console.log("before: restock = ", product.stock);

  product.stock += amount;

  console.log("after: restock = ", product.stock);

  return res.json({
    success: true,
    stock: product.stock,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
