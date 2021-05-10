const express = require('express');
const router = express.Router();
const controller = require('../../controllers/upload');

router.post('/', controller.upload)
      .get('/:filename', controller.fetch)
      .delete('/:filename', controller.delete);

module.exports = router;