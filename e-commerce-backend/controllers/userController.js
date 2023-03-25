const User = require("../models/User");

// signup
const userSignup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });
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

module.exports = {
  userSignup,
  userLogin,
  getUsers,
};
