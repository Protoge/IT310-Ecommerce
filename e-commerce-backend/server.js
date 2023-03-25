const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: "*", methods: "*" });
const cors = require("cors");
require("./connection");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const imagesRoutes = require("./routes/imagesRoutes");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/images", imagesRoutes);

server.listen(8080, () => console.log("server running at port", 8080));
