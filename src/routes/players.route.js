const express = require('express');
const router = express.Router({ mergeParams: true });

const auth = require('../middleware/auth');
const playersController = require('../controllers/players.controller');

router.get('/', auth, playersController.getAll);
router.get('/:ids/stats', auth, playersController.getStatsByIds);
router.get('/:ids', auth, playersController.get);


module.exports = router;