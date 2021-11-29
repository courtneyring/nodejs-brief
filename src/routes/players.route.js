const express = require('express');
const router = express.Router({ mergeParams: true });
const playersController = require('../controllers/players.controller');

router.get('/', playersController.getAll);
router.get('/:ids/stats', playersController.getStatsByIds);
router.get('/:ids', playersController.getPlayersByIds);


module.exports = router;