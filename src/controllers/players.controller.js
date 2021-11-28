const playersService = require('../services/players.service');

const get = async function (req, res) {
    let ids = req.params.ids.split(',');
    res.status(200).send(await playersService.get(ids))
}

const getAll = async function (req, res) {
    res.status(200).send(await playersService.getAll())
}
module.exports = {
    get,
    getAll
};