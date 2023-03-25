const Product = require("../models/Product");
const User = require("../models/User");

// get products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// get product and similar products
const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    const similar = await Product.find({
      category: product.category,
    }).limit(5);
    res.status(200).json({ product, similar });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// create a product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, images: pictures } = req.body;
    const product = await Product.create({
      name,
      description,
      price,
      category,
      pictures,
    });
    const products = await Product.find();
    res.status(201).json(products);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// update product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const { name, description, price, category, images: pictures } = req.body;
    const product = await Product.findByIdAndUpdate(id, {
      name,
      description,
      price,
      category,
      pictures,
    });
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// delete product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;
  try {
    const user = await User.findById(user_id);
    if (!user.isAdmin)
      return res
        .status(401)
        .json("You don't have permission to delete this product");
    await Product.findByIdAndDelete(id);
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// category
const getCategory = async (req, res) => {
  const { category } = req.params;
  try {
    let products;
    const sort = { _id: -1 };
    if (category == "all") {
      products = await Product.find().sort(sort);
    } else {
      products = await Product.find({ category }).sort(sort);
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// cart
const addToCart = async (req, res) => {
  const { userId, productId, price } = req.body;
  try {
    const user = await User.findById(userId);
    const userCart = user.cart;
    if (user.cart[productId]) {
      userCart[productId] += 1;
    } else {
      userCart[productId] = 1;
    }

    userCart.count += 1;
    userCart.total = Number(userCart.total) + Number(price);
    user.cart = userCart;
    user.markModified("cart");
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// increase cart count
const increaseCart = async (req, res) => {
  const { userId, productId, price } = req.body;
  try {
    const user = await User.findById(userId);
    const userCart = user.cart;
    userCart.total += Number(price);
    userCart.count += 1;
    userCart[productId] += 1;
    user.cart = userCart;
    user.markModified("cart");
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// decrease cart count
const decreaseCart = async (req, res) => {
  const { userId, productId, price } = req.body;
  try {
    const user = await User.findById(userId);
    const userCart = user.cart;
    userCart.total -= Number(price);
    userCart.count -= 1;
    userCart[productId] -= 1;
    user.cart = userCart;
    user.markModified("cart");
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// remove from cart
const removeFromCart = async (req, res) => {
  const { userId, productId, price } = req.body;
  try {
    const user = await User.findById(userId);
    const userCart = user.cart;
    userCart.total -= Number(userCart[productId]) * Number(price);
    userCart.count -= userCart[productId];
    delete userCart[productId];
    user.cart = userCart;
    user.markModified("cart");
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getCategory,
  addToCart,
  increaseCart,
  decreaseCart,
  removeFromCart,
};
