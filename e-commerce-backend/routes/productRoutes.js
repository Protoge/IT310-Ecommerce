const {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
  getProduct,
  getCategory,
  addToCart,
  decreaseCart,
  increaseCart,
  removeFromCart,
} = require("../controllers/productController");

const express = require("express");

const router = express.Router();

router.route("/").get(getProducts).post(createProduct);

router.route("/:id").get(getProduct).patch(updateProduct).delete(deleteProduct);

// category routes

router.route("/category/:category").get(getCategory);

// cart routes
router.route("/add-to-cart").post(addToCart);
router.route("/increase-cart").post(increaseCart);
router.route("/decrease-cart").post(decreaseCart);
router.route("/remove-from-cart").post(removeFromCart);
module.exports = router;
