const resultsService = require('../services/results.service');


const getAll = function(req, res){
    res.status(200).send(resultsService.getAll())
}

module.exports = {
    getAll
};