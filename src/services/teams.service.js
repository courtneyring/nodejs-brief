const dataService = require('./data.service');

const get = async function(ids){
    let allTeams = await getAll();
    if (ids == '*') return allTeams;
    return allTeams.filter(team => ids.includes(team.team_id));
}


const getAll = async function(){
    let data = await dataService.getData('teams');
    return data;
}


module.exports = {
    get,
    getAll
};