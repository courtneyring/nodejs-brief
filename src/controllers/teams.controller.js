const teamsService = require('../services/teams.service');

const get = function(req, res){
    res.status(200).send(teamsService.get(req.params.ids))
}

const getAll = function(req, res){
    res.status(200).send(teamsService.getAll())
}

module.exports = {
    get,
    getAll
};