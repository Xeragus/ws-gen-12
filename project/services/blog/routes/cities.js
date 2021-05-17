const express = require('express');
const router = express.Router();
const controller = require('../../../controllers/cities');

router.post('/', controller.addCity)
      .get('/:id', controller.fetchOneCity)
      .get('/', controller.fetchAll)

module.exports = router;