const teamsService = require('../services/teams.service');
const resultsService = require('../services/results.service');


const get = async function (req, res) {
    let ids = req.params.ids.split(',');
    res.status(200).send(await teamsService.get(ids))
}

const getAll = async function (req, res) {
    res.status(200).send(await teamsService.getAll())
}

const getStatsByIds = async function (req, res) {
    let ids = req.params.ids.split(',');
    let teams = await teamsService.get(ids);
    let promises = teams.map(async (team) => {
        let teamStats = await resultsService.getStatsByTeam(team);
        return { ...teamStats, ...team }
    });
    let stats = await Promise.all(promises);
    res.status(200).send(stats)
}


module.exports = {
    get,
    getAll, 
    getStatsByIds
};