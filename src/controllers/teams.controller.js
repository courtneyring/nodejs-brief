const teamsService = require('../services/teams.service');
const resultsService = require('../services/results.service');

const getTeamsByIds = async function (req, res, next) {
    try {
        let ids = req.params.ids.split(',');
        res.status(200).send(await teamsService.get(ids))
    }
    catch (e) {
        next(e);
    }

}

const getAll = async function (req, res, next) {
    try {
        res.status(200).send(await teamsService.getAll())
    }
    catch (e) {
        next(e);
    }

}

const getStatsByIds = async function (req, res, next) {
    try {
        let ids = req.params.ids.split(',');
        let teams = await teamsService.get(ids);
        let promises = teams.map(async (team) => await _mapStats(team));
        let stats = await Promise.all(promises);
        res.status(200).send(stats)
    }
    catch (e) {
        next(e);
    }

}

const _mapStats = async function (team) {
    let teamStats = await resultsService.getStatsByTeam(team);
    return { ...teamStats, ...team }
}

module.exports = {
    getAll,
    getTeamsByIds,
    getStatsByIds
};