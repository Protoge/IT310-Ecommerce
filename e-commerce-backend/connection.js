require("dotenv").config();

const mongoose = require("mongoose");

const connectionStr = "";
mongoose
  .connect(process.env.MONGODB_URI_CONNECTION, { useNewURLparser: true })
  .then(() => console.log("connected to mongod"))
  .catch((err) => console.log(err));

mongoose.connection.on("error", (err) => {
  console.log(err);
});
