const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: "http://localhost:3001",
  methods: ["GET", "POST", "PATCH", "DELETE"],
});
const cors = require("cors");
require("dotenv").config();
require("./connection");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const imagesRoutes = require("./routes/imagesRoutes");
const orderRoutes = require("./routes/orderRoutes");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/images", imagesRoutes);
app.use("/orders", orderRoutes);

app.post("/create-payment", async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });
    res.status(200).json(paymentIntent);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

server.listen(process.env.PORT || 8080, () =>
  console.log("server running at port", 8080)
);

app.set("socketio", io);
