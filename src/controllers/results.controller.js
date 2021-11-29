const resultsService = require('../services/results.service');

const getAll = async function(req, res, next){
    try {
        res.status(200).send(await resultsService.getAll())
    }
    catch (e) {
        next(e);
    }
    
}

module.exports = {
    getAll
};