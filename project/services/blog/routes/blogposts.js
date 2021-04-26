const express = require('express');
const router = express.Router();
const controller = require('../../../controllers/blogposts');

router.get('/', controller.fetchAll)
      .get('/:id', controller.fetchOne)
      .post('/', controller.create)
      .put('/:id', controller.putUpdate)
      .patch('/:id', controller.patchUpdate)
      .delete('/:id', controller.delete);

module.exports = router;