const Order = require("../models/Order");
const User = require("../models/User");

// create order
const createOrder = async (req, res) => {
  const { userId, cart, country, address } = req.body;

  try {
    const user = await User.findById(userId);
    const order = await Order.create({
      owner: user._id,
      products: cart,
      country,
      address,
    });
    order.count = cart.count;
    order.total = cart.total;
    await order.save();
    user.cart = { total: 0, count: 0 };
    user.orders.push(order);
    user.markModified("orders");
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

// getting all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("owner", ["email", "name"]);
    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

// shipping order
const shipOrder = async (req, res) => {
  const { ownerId } = req.body;
  const { id } = req.params;
  try {
    const user = await User.findById(ownerId);
    await Order.findByIdAndUpdate(id, { status: "shipped" });
    const orders = await Order.find().populate("owner", ["email", "name"]);
    res.status(200).json(orders);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  shipOrder,
};
