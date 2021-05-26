const express = require("express");
const router = express.Router();
const controller = require("../../controllers/users");

router.get("/", controller.getAll).get("/:id", controller.getUser);

module.exports = router;
