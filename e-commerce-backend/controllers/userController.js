const User = require("../models/User");
const Order = require("../models/Order");
const bcrypt = require("bcrypt");

// signup
const userSignup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    res.json(user);
  } catch (err) {
    if (err.code === 11000) return res.status(400).send("Email already exists");
    res.status(400).send(err.message);
  }
};

// login
const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByCredentials(email, password);

    res.json(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// get users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false }).populate("orders");
    res.json(users);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// get user orders
const getUserOrders = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate("orders");
    res.json(user.orders);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = {
  userSignup,
  userLogin,
  getUsers,
  getUserOrders,
};
