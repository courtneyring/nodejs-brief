const express = require('express');
const router = express.Router({ mergeParams: true });

const auth = require('../middleware/auth');
const resultsController = require('../controllers/results.controller');

router.get('/', auth, resultsController.getAll);

module.exports = router;