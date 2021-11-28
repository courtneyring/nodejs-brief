const express = require('express');
const router = express.Router({ mergeParams: true });

const teamsController = require('../controllers/teams.controller');

router.get('/', teamsController.getAll);
router.get('/:ids', teamsController.get);


module.exports = router;