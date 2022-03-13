const express = require("express");
const router = express.Router();
const controller = require("../controllers/blogposts");

router.route("/").get(controller.fetchAll).post(controller.create);

router
    .route("/:id")
    .get(controller.fetchOne)
    .put(controller.putUpdate)
    .patch(controller.patchUpdate)
    .delete(controller.delete);

// router.get('/', controller.fetchAll)
//       .get('/:id', controller.fetchOne)
//       .post('/', controller.create)
//       .put('/:id', controller.putUpdate)
//       .patch('/:id', controller.patchUpdate)
//       .delete('/:id', controller.delete);

module.exports = router;
