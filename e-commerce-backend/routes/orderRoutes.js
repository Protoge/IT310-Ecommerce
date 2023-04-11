const express = require("express");
const router = express.Router();

const {
  createOrder,
  getAllOrders,
  shipOrder,
} = require("../controllers/orderController");

router.route("/").get(getAllOrders).post(createOrder);

router.route("/:id/mark-shipped").patch(shipOrder);

module.exports = router;
