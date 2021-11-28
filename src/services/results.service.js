const dataService = require('./data.service');

const getAll = async function(){
    let data = await dataService.getData('results');
    return data;
}

module.exports = {
    getAll
};