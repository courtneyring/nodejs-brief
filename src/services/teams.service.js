const data = require('../data/teams.json');


const get = function(ids){
    return getAll().filter(team => ids.includes(team.team_id));
}

const getAll = function(){
    return data;
}


module.exports = {
    get,
    getAll
};