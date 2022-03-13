const express = require("express");
const router = express.Router();
const controller = require("../controllers/categorysController");

router.route("/").get(controller.fetchAll).post(controller.create);
router
    .route("/:id")
    .get(controller.fetchOne)
    .put(controller.putUpdate)
    .patch(controller.patchUpdate)
    .delete(controller.delete);

module.exports = router;
