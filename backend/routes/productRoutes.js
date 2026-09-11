const express = require("express");

const {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getLowStockProducts
} = require("../controllers/productController");

const router = express.Router();

router.post("/", addProduct);

router.get("/", getProducts);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

router.get("/low-stock", getLowStockProducts);

module.exports = router;