const resultsService = require('../services/results.service');

const get = async function(req, res){
    res.status(200).send(await resultsService.get(req.params.id))
}

const getAll = async function(req, res){
    res.status(200).send(await resultsService.getAll())
}

module.exports = {
    get,
    getAll
};