const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.route("/").get(userController.getUsers);
router.route("/login").post(userController.userLogin);
router.route("/signup").post(userController.userSignup);
router.route("/:id/orders").get(userController.getUserOrders);

module.exports = router;
