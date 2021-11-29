const express = require('express');
const router = express.Router({ mergeParams: true });
const teamsController = require('../controllers/teams.controller');

router.get('/', teamsController.getAll);
router.get('/:ids/stats', teamsController.getStatsByIds);
router.get('/:ids', teamsController.getTeamsByIds);

module.exports = router;