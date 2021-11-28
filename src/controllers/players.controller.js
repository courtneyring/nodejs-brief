const playersService = require('../services/players.service');

const get = function(req, res){
    res.status(200).send(playersService.get(req.params.ids))
}

const getAll = function(req, res){
    res.status(200).send(playersService.getAll())
}

module.exports = {
    get,
    getAll
};