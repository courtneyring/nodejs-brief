const teamsService = require('../services/teams.service');

const get = async function (req, res) {
    let ids = req.params.ids.split(',');
    res.status(200).send(await teamsService.get(ids))
}

const getAll = async function (req, res) {
    res.status(200).send(await teamsService.getAll())
}


module.exports = {
    get,
    getAll
};