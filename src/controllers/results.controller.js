const resultsService = require('../services/results.service');

const get = async function(req, res, next){
    try {
        res.status(200).send(await resultsService.get(req.params.id))
    }
    catch (e) {
        next(e);
    }
    
}

const getAll = async function(req, res, next){
    try {
        res.status(200).send(await resultsService.getAll())
    }
    catch (e) {
        next(e);
    }
    
}

module.exports = {
    get,
    getAll
};