const playersService = require('../services/players.service');
const teamsService = require('../services/teams.service');
const resultsService = require('../services/results.service');

const get = async function (req, res, next) {
    try {
        let ids = req.params.ids.split(',');
        res.status(200).send(await playersService.get(ids))
    }
    catch (err) {
        next(err)
    }

}

const getAll = async function (req, res, next) {
    try {
        res.status(200).send(await playersService.getAll())
    }

    catch (err) {
        next(err)
    }
}


const getStatsByIds = async function (req, res, next) {
    try {
        let ids = req.params.ids.split(',');
        let players = await playersService.get(ids);
        let promises = players.map(async (player) => await _mapStats(player))
        let stats = await Promise.all(promises);
        res.status(200).send(stats)
    }
    catch (err) {
        next(err)
    }
}

const _mapStats = async function (player) {
    let teamArr = await teamsService.get([player.team_id]);
    let team = teamArr[0];
    let playerStats = await resultsService.getStatsByPlayer(player);
    return { ...player, ...playerStats, team_id: team.team_id, team_name: team.name };
}

module.exports = {
    get,
    getAll,
    getStatsByIds
};