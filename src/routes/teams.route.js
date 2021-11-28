const express = require('express');
const router = express.Router({ mergeParams: true });

const auth = require('../middleware/auth');
const teamsController = require('../controllers/teams.controller');

router.get('/', auth, teamsController.getAll);
router.get('/:ids/stats', auth, teamsController.getStatsByIds);
router.get('/:ids', auth, teamsController.get);


module.exports = router;