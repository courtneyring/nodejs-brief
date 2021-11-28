const express = require('express');
const teams = require('./teams.route');
const players = require('./players.route');
const results = require('./results.route');

const router = express.Router();

router.use('/teams', teams);
router.use('/players', players);
router.use('/results', results);

router.get('/', (req, res) => res.send('Code Test API'));


module.exports = router;