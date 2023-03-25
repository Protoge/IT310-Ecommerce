const { deleteImage } = require("../controllers/imagesController");
const express = require("express");
const router = express.Router();

router.delete("/:public_id", deleteImage);

module.exports = router;
