const express = require('express');
const router = express.Router({ mergeParams: true });
const resultsController = require('../controllers/results.controller');

router.get('/', resultsController.getAll);

module.exports = router;