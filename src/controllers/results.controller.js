const resultsService = require('../services/results.service');


const getAll = async function(req, res){
    res.status(200).send(await resultsService.getAll())
}

module.exports = {
    getAll
};