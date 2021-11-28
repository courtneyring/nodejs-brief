const playersService = require('../services/players.service');
const teamsService = require('../services/teams.service');
const resultsService = require('../services/results.service');


const get = async function (req, res) {
    let ids = req.params.ids.split(',');
    res.status(200).send(await playersService.get(ids))
}

const getAll = async function (req, res) {
    res.status(200).send(await playersService.getAll())
}

const getStatsByIds = async function (req, res) {
    let ids = req.params.ids.split(',');
    let players = await playersService.get(ids);
    let promises = players.map(async (player) => {
        let teamArr = await teamsService.get([player.team_id]);
        let team = teamArr[0];
        let playerStats = await resultsService.getStatsByPlayer(player);
        return { ...player, ...playerStats, team_id: team.team_id, team_name: team.name };
    })
    let stats = await Promise.all(promises);
    res.status(200).send(stats)
}

module.exports = {
    get,
    getAll,
    getStatsByIds
};